import type { Session } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { NextPage, GetServerSideProps } from 'next'

import NavBar from '@/components/NavBar'
import ChangePassword from '@/components/Forms/ChangePassword'
import ChangeEmail from '@/components/Forms/ChangeEmail'
import { Box, Typography } from '@mui/material'
import Downloading from '@mui/icons-material/DownloadingOutlined'


const Profile: NextPage = () => {
    const { data: session, status } = useSession({required: true})
    const user = session?.user

    if (status === 'loading') {
        return <Box><Downloading /></Box>
    }
    if (!session) {
        return <Box>Error: Session not found</Box>
    }
    
    return (
        <>
            <NavBar />
            <Box mt={4} mx={2}>
                <Typography variant="h4">Profile</Typography>
                <Typography variant="body1">Email: {user?.email}</Typography>
                <Typography variant="body1">Name: {user?.name}</Typography>
                <ChangeEmail />
                <ChangePassword />
            </Box>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<{ session: Session | null }> = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    return {
        props: {
            session,
        },
    }
}

export default Profile
