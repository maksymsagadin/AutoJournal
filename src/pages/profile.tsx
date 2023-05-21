import { useSession } from 'next-auth/react'
import { NextPage } from 'next'
import { Box, Typography } from '@mui/material'

interface User {
    email: string
    name: string
    // image?: Vehicle[]
}

const Profile: NextPage = () => {
    const { data: session } = useSession()

    if (!session) {
        return null
    }

    const user: User = session.user || {}

    return (
        <Box>
            <Typography variant="h4">Profile</Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">Name: {user.name}</Typography>
        </Box>
    )
}

export default Profile
