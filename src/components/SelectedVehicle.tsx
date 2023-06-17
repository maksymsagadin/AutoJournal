import { useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { Vehicle } from '@/utils/types'
import EditVehicleForm from '@/components/Forms/EditVehicleForm'

interface SelectedVehicleProps {
    vehicle: Vehicle,
    onEdit: (vehicle: Vehicle) => void
    onDelete: (vehicle: Vehicle) => void
}

const SelectedVehicle: React.FC<SelectedVehicleProps> = ({ vehicle, onEdit, onDelete }) => {
    
    return (
        <Box>
            <Box display='flex' alignItems='center'>
                <Typography variant="h5" component="h2">
                    Selected Vehicle: {vehicle.name || `${vehicle.make} ${vehicle.model}`}
                </Typography>
                <EditVehicleForm vehicle={vehicle} onEdit={onEdit} onDelete={onDelete} />
            </Box>

            <Typography variant="h5" component="h4">
                Vehicle: {vehicle.make} {vehicle.model}
            </Typography>
            <Typography variant="body1" component="p">
                Year: {vehicle.year}
            </Typography>
            <Typography variant="body1" component="p">
                Color: {vehicle.color}
            </Typography>
            <Typography variant="body1" component="p">
                Mileage: {vehicle.mileage}
            </Typography>
        </Box>
    )
}

export default SelectedVehicle
