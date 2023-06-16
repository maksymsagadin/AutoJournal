import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Box, TextField, Button, Paper, Typography, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Vehicle } from '@/utils/types'

const AddVehicleForm = ({ onAddVehicle }) => {
    const { data: session, update } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newVehicle: Vehicle = {
            name: event.currentTarget.name.value,
            year: event.currentTarget.year.value,
            make: event.currentTarget.make.value,
            model: event.currentTarget.model.value,
            color: event.currentTarget.color.value,
            mileage: event.currentTarget.mileage.value,
            journalEntries: [],
        }

        // Send the new vehicle data to the server
        const res = await fetch('/api/vehicle/add-vehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newVehicle),
        })

        if (res.ok) {
            // If the server responded with a success status, update the local state
            const updatedVehicles = await res.json()
            onAddVehicle(newVehicle)
            await update({ image: updatedVehicles })
        } else {
            // If the server responded with an error status, handle the error
            console.error('Error adding vehicle')
            setIsOpen(prevState => !prevState)
        }
    }

    return (
        <Box justifyContent='center' sx={{m:1}}>
            {!isOpen ? (
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => setIsOpen(true)}
                    >
                    Add Vehicle
                </Button>
            ) : (
                <Paper elevation={3} sx={{ p: 2, m: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Add New Vehicle
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                label="Nick Name"
                                name="name"
                                type='text'
                                margin='dense'
                                fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Year"
                                    name="year"
                                    type='number'
                                    margin='dense'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Make"
                                    name="make"
                                    type='text'
                                    margin='dense'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Model"
                                    name="model"
                                    type='text'
                                    margin='dense'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>

                                <TextField
                                    label="Color"
                                    name="color"
                                    type='text'
                                    margin='dense'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Mileage"
                                    name="mileage"
                                    type='number'
                                    margin='dense'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item display="flex" justifyContent="end" xs={12}>
                                <Button type="submit" variant="contained" color="primary" sx={{ my: 1 }}>
                                    Submit
                                </Button>
                                <Button variant="contained" color="secondary" sx={{ m: 1 }} onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            )}
        </Box>
    )
}

export default AddVehicleForm