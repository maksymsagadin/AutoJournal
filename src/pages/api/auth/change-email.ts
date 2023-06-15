import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from './[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { connectToDatabase } from '@/lib/mongodb'
import { verifyPassword } from '@/lib/bcryptpw'


export default async function changeEmailHandler(req: NextApiRequest, res: NextApiResponse) {
    //Only PATCH method is accepted
    if (req.method === 'PATCH') {
        const { newEmail, confirmPW } = req.body
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: 'Not authenticated!' })
            return
        }

        //Get client connection
        const client = await connectToDatabase()
        const db = client.db().collection('users')

        //Check existing
        const user = await db.findOne({ email: session.user?.email })

        //Send error response if user is not found
        if (!user) {
            res.status(404).json({ message: 'User not found.' })
            return
        }

        //Validate Password in Database to entered password
        const passwordsAreEqual = await verifyPassword(confirmPW, user.password)
        if (!passwordsAreEqual) {
            res.status(403).json({ message: 'Invalid password.' })
            return
        }
        //Validate new email isn't already being used
        const alreadyExist = await db.findOne({ email: newEmail})
        if (alreadyExist) {
            res.status(404).json({ message: 'New email is already being used.' })
            return
        }

        //Update email in database
        const result = await db.updateOne(
            { email: user.email },
            { $set: { email: newEmail } }
        )

        //Send success response
        res.status(200).json({ message: 'Email updated!' })

    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' })
    }
}