import { Card, CardContent, Typography } from '@mui/material'
import { Vehicle } from '@/utils/types'

interface VehicleCardProps {
    vehicle: Vehicle,
    onSelect: (vehicle: Vehicle) => void
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onSelect }) => {
    return (
        <Card sx={{ minWidth: 275, cursor: 'zoom-in' }} onClick={() => onSelect(vehicle)}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {vehicle.name || `${vehicle.make} ${vehicle.model}`}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Year: {vehicle.year}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Color: {vehicle.color}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Odometer: {vehicle.mileage}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default VehicleCard
