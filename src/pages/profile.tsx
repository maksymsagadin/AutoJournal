import { useSession } from 'next-auth/react'
import { NextPage } from 'next'

import { User } from '@/utils/types'
import NavBar from '@/components/NavBar'

import { Box, Typography } from '@mui/material'
import Downloading from '@mui/icons-material/DownloadingOutlined'


const Profile: NextPage = () => {
    const { data: session, status  } = useSession()

    if (status === 'loading') {
        return <Box><Downloading /></Box>
    }
    
    if (!session) {
        return <Box>Error: Session not found</Box>
    }

    const user: User = session.user || {}

    return (
        <>
            <NavBar />
            <Box mt={4} mx={2}>
                <Typography variant="h4">Profile</Typography>
                <Typography variant="body1">Email: {user.email}</Typography>
                <Typography variant="body1">Name: {user.name}</Typography>
            </Box>
        </>
    )
}

export default Profile
