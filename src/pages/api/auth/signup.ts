import { NextApiRequest, NextApiResponse } from 'next'
import {connectToDatabase} from '@/lib/mongodb'
import {hashPassword} from '@/lib/bcryptpw'
import { SignUpData } from '@/utils/types'

export default async function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
    //Only POST method is accepted
    if (req.method === 'POST') {
        const { firstName, lastName, email, password }: SignUpData = req.body
        
        //Validate
        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: 'Invalid Data' })
            return
        }

        //Get client from clientPromise
        const client = await connectToDatabase()
        const db = client.db()

        //Check existing
        const checkExisting = await db.collection('users').findOne({ email: email })

        //Send error response if duplicate user is found
        if (checkExisting) {
            res.status(422).json({ message: 'User already exists' })
            return
        }

        //Add user and hash password
        const status = await db.collection('users').insertOne({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: await hashPassword(password),
            vehicles: []
        })

        //Send success response
        res.status(201).json({ message: 'User created', ...status })
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' })
    }
}