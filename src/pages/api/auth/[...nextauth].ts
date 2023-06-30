import NextAuth from 'next-auth'
import type { NextAuthOptions, RequestInternal } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {connectToDatabase} from '@/lib/mongodb'
import {verifyPassword} from '@/lib/bcryptpw'

export const authOptions: NextAuthOptions = {
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
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error('No credentials provided')
                }
                const { email, password } = credentials
                //Connect to MongoDB
                const client = await connectToDatabase()
                //Get all the users
                const db = await client.db().collection('users')
                //Find user that's requesting access
                const user = await db.findOne({ email: email })
                //Not found - send error res
                if (!user) {
                    throw new Error('No user found with that email')
                }
                //Password Validation
                const checkPassword = await verifyPassword(password, user.password)
                if (!checkPassword) {
                    return null
                    throw new Error('Password doesnt match')
                }
                return {
                    id: user.email,
                    email: user.email,
                    name: user.firstName,
                    image: user.vehicles,
                    // The 'image' property is being repurposed to store vehicle data
                }
            },
            credentials: undefined
        }),
    ],
    callbacks: {
        jwt({ token, trigger, session }) {
            if (trigger === 'update' && session?.image) {
                // Updating token.picture updates the session.image for the overall app but updating token.image does not update the returned session.image
                token.picture = session.image
            }
            return token
        }
    }
  }

export default NextAuth(authOptions)