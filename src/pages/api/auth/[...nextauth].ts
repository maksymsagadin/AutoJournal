import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {connectToDatabase} from '@/lib/mongodb'
import {verifyPassword} from '@/lib/bcryptpw'
import { Credentials } from '@/utils/types'

export const authOptions: NextAuthOptions = {
    //Configure JWT
    session: {
        strategy: 'jwt',
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days * 2
        
    },
    useSecureCookies: process.env.NODE_ENV === 'production',
    secret: process.env.SECRET,
    jwt: {
        secret: process.env.SECRET,
    },
    //Specify Provider
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email ', placeholder: 'meow@meows' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error('No credentials provided')
                }
                const { email, password } = credentials

                //Connect to DB
                const client = await connectToDatabase()
                //Get all the users
                const users = await client.db().collection('users')
                //Find user with the email  
                const result = await users.findOne({email: email})
                //Not found - send error res
                if (!result) {
                    throw new Error('No user found with that email')
                }
                //Check hashed password with DB password
                const checkPassword = await verifyPassword(password, result.password)
                //Incorrect password - send response
                if (!checkPassword) {
                    throw new Error('Password doesnt match')
                }
                //Else send success response
                return {
                    email: result.email,
                    name: result.firstName,
                    // Note: We're using the `image` property to store vehicle data instead of a user profile picture URL.
                    image: result.vehicles,
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, trigger, session }) {
            if (trigger === 'update' && session?.image) {
                // Note: We're using the `picture` property to store vehicle data instead of a user profile picture URL. 
                // Updating token.picture updates the session.image for the overall app but updating token.image does not update the returned session.image
                token.picture = session.image
            }
            return token
        }
    }
  }

export default NextAuth(authOptions)