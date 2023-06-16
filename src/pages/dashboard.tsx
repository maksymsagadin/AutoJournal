import { NextPage, GetServerSideProps } from 'next'
import type { Session } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'

import { useState } from 'react'
import NavBar from '@/components/NavBar'
import { Box, Typography, Grid } from '@mui/material'
import Downloading from '@mui/icons-material/DownloadingOutlined'
import AddVehicleForm from '@/components/Forms/AddVehicleForm'
import VehicleCard from '@/components/VehicleCard'

const dashboard: NextPage = () => {
    const { data: session, status, update } = useSession()
    const [vehicles, setVehicles] = useState(session?.user?.image || [])
    const user = session?.user

    const handleAddVehicle = (newVehicle) => {
        setVehicles(prevVehicles => [...prevVehicles, newVehicle])
    }

    if (status === 'loading') {
        return <Box><Downloading /></Box>
    }
    if (!session) {
        return <Box>Error: Not logged in</Box>
    }
    
    return (
        <>
            <NavBar />
            <Box mt={4} mx={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                Welcome, {user?.name}
                </Typography>
                <Box display="flex" alignItems="center" margin='normal'>
                    <Typography variant="h6" component="h2" gutterBottom>
                        You have {vehicles?.length} vehicles,
                    </Typography>
                    <AddVehicleForm onAddVehicle={handleAddVehicle} />
                </Box>
                
                <Grid container spacing={3}>
                    {vehicles?.map((vehicle: {}, index: number) => (
                        <Grid item key={index}>
                            <VehicleCard vehicle={vehicle} />
                        </Grid>
                    ))}
                </Grid>
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

export default dashboard