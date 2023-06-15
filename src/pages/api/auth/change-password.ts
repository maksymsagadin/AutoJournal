import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from './[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { connectToDatabase } from '@/lib/mongodb'
import { hashPassword, verifyPassword } from '@/lib/bcryptpw'
import { PasswordUpdate } from '@/utils/types'

export default async function changePasswordHandler(req: NextApiRequest, res: NextApiResponse) {
    //Only PATCH method is accepted
    if (req.method === 'PATCH') {
        const { oldPW, newPW }: PasswordUpdate = req.body
        
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: 'Not authenticated!' })
            return
        }

        //Validate
        if (oldPW === newPW) {
            res.status(422).json({ message: 'New Password is the same as Old Password.' })
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

        //Compare Password in Database to entered password
        const passwordsAreEqual = await verifyPassword(oldPW, user.password)
        if (!passwordsAreEqual) {
            res.status(403).json({ message: 'Invalid password.' })
            return
        }
        
        //Update Password for database
        const hashedPassword = await hashPassword(newPW)
        const result = await db.updateOne(
            { email: user.email },
            { $set: { password: hashedPassword } }
        )

        //Send success response
        res.status(200).json({ message: 'Password updated!' })

    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' })
    }
}