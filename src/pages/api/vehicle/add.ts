import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '@/lib/mongodb'
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'

export default async function addVehicleHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const newVehicle = req.body
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: 'Not authenticated!' })
            return
        }
        const client = await connectToDatabase()
        const db = client.db().collection('users')

        // Check for existing user
        const user = await db.findOne({ email: session.user?.email })

        if (!user) {
            res.status(404).json({ message: 'User not found.' })
            return
        }

        // Add the new vehicle to the user's vehicles
        const result = await db.updateOne(
            { email: user.email },
            { $push: { vehicles: newVehicle } }
        )
        // Find updated user
        const updatedUser = await db.findOne({ email: session.user?.email })
        
        res.status(200).json(updatedUser.vehicles)
    } else {
        res.status(500).json({ message: 'Route not valid' })
    }
}
