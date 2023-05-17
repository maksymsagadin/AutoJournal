import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import clientPromise from '@/lib/mongodb'

export default NextAuth({
    //Configure JWT
    session: {
        strategy: 'jwt',
    },
    //Specify Provider
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Username", type: "email", placeholder: "name@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                //Connect to DB
                const client = await clientPromise
                //Get all the users
                const users = await client.db().collection('users')
                //Find user with the email  
                const result = await users.findOne({email: credentials.email})
                //Not found - send error res
                if (!result) {
                    client.close()
                    throw new Error('No user found with that email')
                }
                //Check hashed password with DB password
                const checkPassword = await compare(credentials.password, result.password)
                //Incorrect password - send response
                if (!checkPassword) {
                    client.close()
                    throw new Error('Password doesnt match')
                }
                //Else send success response
                client.close()
                return { email: result.email }
            },
        }),
    ],
})