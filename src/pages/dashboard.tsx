import { NextPage, GetServerSideProps } from 'next'
import type { Session } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import { useSession } from 'next-auth/react'

import { useState } from 'react'
import NavBar from '@/components/NavBar'
import { Box, Typography, Grid, Button } from '@mui/material'
import Downloading from '@mui/icons-material/DownloadingOutlined'
import AddVehicleForm from '@/components/Forms/AddVehicleForm'
import VehicleCard from '@/components/VehicleCard'
import SelectedVehicle from '@/components/SelectedVehicle'
import { Vehicle } from '@/utils/types'

const dashboard: NextPage = () => {
    const { data: session, status, update } = useSession({required: true})
    const [vehicles, setVehicles] = useState(session?.user?.image || [])
    const [selectedVehicle, setSelectedVehicle] = useState(true)
    const [showVehicles, setShowVehicles] = useState(true)
    const user = session?.user

    // Handle State after Adding a vehicle
    const handleAddVehicle = (newVehicle) => {
        setVehicles(prevVehicles => [...prevVehicles, newVehicle])
    }
    // Handle State after Selecting a vehicle
    const handleSelectVehicle = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle)
        setShowVehicles(false)
    }
    // Handle State after Editing a vehicle
    const handleEditVehicle = (editedVehicle: Vehicle) => {
        setVehicles(prevVehicles => 
            prevVehicles.map(vehicle => 
                vehicle.id === editedVehicle.id ? editedVehicle : vehicle
            )
        )
        if (selectedVehicle.id === editedVehicle.id) {
            setSelectedVehicle(editedVehicle)
        }
    }
    // Handle State after Deleting a vehicle
    const handleDeleteVehicle = (deletedVehicle: Vehicle) => {
        setVehicles(prevVehicles => 
            prevVehicles.filter(vehicle => vehicle.id !== deletedVehicle.id)
        )
        if (selectedVehicle.id === deletedVehicle.id) {
            setShowVehicles(true)
            setSelectedVehicle(false)
        }
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
                {showVehicles ? (
                    <>
                        <Box alignItems="center" margin='normal'>
                            <Typography variant="h6" component="h2" gutterBottom>
                                You have {vehicles?.length} vehicles.
                            </Typography>
                            <AddVehicleForm onAddVehicle={handleAddVehicle} />
                        </Box>
                        <Grid display='flex' justifyContent='center' container spacing={2}>
                            {vehicles?.map((vehicle: {}, index: number) => (
                                <Grid item key={index}>
                                    <VehicleCard 
                                        vehicle={vehicle} 
                                        onSelect={handleSelectVehicle}
                                        // onDeleteVehicle={handleDeleteVehicle} 
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <>
                        <Button variant="outlined" onClick={() => setShowVehicles(true)}>Back to Vehicles</Button>
                        <SelectedVehicle vehicle={selectedVehicle} onEdit={handleEditVehicle} onDelete={handleDeleteVehicle} />
                    </>
                )}
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