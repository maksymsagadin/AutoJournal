import { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcryptjs'
import clientPromise from '@/lib/mongodb'

interface SignUpData {
    firstName: string
    lastName: string
    email: string
    password: string
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    //Only POST mothod is accepted
    if (req.method === 'POST') {
        const { firstName, lastName, email, password }: SignUpData = req.body
        
        //Validate
        if (!email || !email.includes('@') || !password) {
            res.status(422).json({ message: 'Invalid Data' })
            return
        }

        //Get client from clientPromise
        const client = await clientPromise
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
            password: await hash(password, 12),
            vehicles: []
        })

        //Send success response
        res.status(201).json({ message: 'User created', ...status })
    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' })
    }
}

export default handler