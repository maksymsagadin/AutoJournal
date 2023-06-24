import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Box, TextField, Button, Paper, Typography, Grid, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Vehicle } from '@/utils/types'

interface EditVehicleProps {
    vehicle: Vehicle,
    onEdit: (vehicle: Vehicle) => void
    onDelete: (vehicle: Vehicle) => void
}

const EditVehicle: React.FC<EditVehicleProps> = ({ vehicle, onEdit, onDelete }) => {
    const { update } = useSession()
    const [editedVehicle, setEditedVehicle] = useState(vehicle)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedVehicle({
            ...editedVehicle,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Call your API endpoint to update the vehicle
        const res = await fetch('/api/vehicle/edit', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedVehicle),
        })
        if (res.ok) {
            // If the server responded with a success status, update the local state
            const updatedVehicles = await res.json()
            onEdit(editedVehicle)
            await update({ image: updatedVehicles })
        } else {
            // If the server responded with an error status, handle the error
            console.error('Error editing vehicle')
        }
    }
    const handleDeleteVehicle = async () => {
        // Call your API endpoint to delete the vehicle
        const res = await fetch('/api/vehicle/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicle),
        })
    
        if (res.ok) {
            // If the server responded with a success status, update the local state
            const updatedVehicles = await res.json()
            onDelete(vehicle)
            await update({ image: updatedVehicles })

        } else {
            // If the server responded with an error status, handle the error
            console.error('Error deleting vehicle')
        }
    }

    return (

        <Box>
            {isEditing ? (
                <Paper elevation={3} sx={{ p: 2, m: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Edit Vehicle
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Nick Name"
                                    name="name"
                                    type='text'
                                    value={editedVehicle.name}
                                    onChange={handleChange}
                                    margin='dense'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Year"
                                    name="year"
                                    type='number'
                                    value={editedVehicle.year}
                                    onChange={handleChange}
                                    margin='dense'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Make"
                                    name="make"
                                    type='text'
                                    value={editedVehicle.make}
                                    onChange={handleChange}
                                    margin='dense'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Model"
                                    name="model"
                                    type='text'
                                    value={editedVehicle.model}
                                    onChange={handleChange}
                                    margin='dense'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Color"
                                    name="color"
                                    type='text'
                                    value={editedVehicle.color}
                                    onChange={handleChange}
                                    margin='dense'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Mileage"
                                    name="mileage"
                                    type='number'
                                    value={editedVehicle.mileage}
                                    onChange={handleChange}
                                    margin='dense'
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" sx={{ my: 1 }}>
                                    Save
                                </Button>
                                <Button variant="contained" color="secondary" sx={{ m: 1 }} onClick={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            ) : (
                <>
                    <IconButton onClick={() => setIsEditing(prevState => !prevState)}>
                        <EditIcon />
                    </IconButton>
                    {isDeleting ? (
                        <>
                        <Button variant="contained" color="error" onClick={handleDeleteVehicle}>
                            Click again to delete
                        </Button>
                        <Button variant="contained" color="secondary" onClick={() => setIsDeleting(false)}>
                            Cancel
                        </Button>
                        </>
                    ) : (
                        <IconButton onClick={() => setIsDeleting(prevState => !prevState)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </>
            )}
        </Box>
    )
}

export default EditVehicle