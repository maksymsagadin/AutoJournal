import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {connectToDatabase} from '@/lib/mongodb'
import {verifyPassword} from '@/lib/bcryptpw'
import { Credentials } from '@/utils/types'


export default NextAuth({
    //Configure JWT
    session: {
        strategy: 'jwt',
    },
    secret: process.env.SECRET,
    jwt: {
        secret: process.env.SECRET,
    },
    //Specify Provider
    providers: [
        CredentialsProvider({
            async authorize(credentials: Credentials) {
                //Connect to DB
                const client = await connectToDatabase()
                //Get all the users
                const users = await client.db().collection('users')
                //Find user with the email  
                const result = await users.findOne({email: credentials.email})
                //Not found - send error res
                if (!result) {
                    throw new Error('No user found with that email')
                }
                //Check hashed password with DB password
                const checkPassword = await verifyPassword(credentials.password, result.password)
                //Incorrect password - send response
                if (!checkPassword) {
                    throw new Error('Password doesnt match')
                }
                //Else send success response
                return {
                    email: result.email,
                    name: result.firstName,
                    image: result.vehicles,
                }
            },
        }),
    ],
})