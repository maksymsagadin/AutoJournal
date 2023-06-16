import { Card, CardContent, Typography } from '@mui/material'

const VehicleCard = ({ vehicle }) => {
    return (
        <Card sx={{ minWidth: 275 }}>
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
                    Mileage: {vehicle.mileage}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default VehicleCard
