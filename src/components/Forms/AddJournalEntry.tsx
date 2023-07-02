import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import { Box, TextField, Checkbox, FormControlLabel, Button, Paper, Typography, Grid, InputAdornment, MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { JournalEntry, Vehicle } from '@/utils/types'

interface AddJournalEntryProps {
    vehicle: Vehicle,
    onAddEntry: (vehicle: Vehicle) => void
}

const AddJournalEntry: React.FC<AddJournalEntryProps> = ({ vehicle, onAddEntry }) => {
    const { update } = useSession()
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const newEntry: JournalEntry = {
            id: uuidv4(),
            future: (event.currentTarget.elements.namedItem('future') as HTMLInputElement).checked,
            service: (event.currentTarget.elements.namedItem('service') as HTMLInputElement).value,
            mileage: parseInt((event.currentTarget.elements.namedItem('mileage') as HTMLInputElement).value),
            date: new Date((event.currentTarget.elements.namedItem('date') as HTMLInputElement).value),
            spent: parseFloat((event.currentTarget.elements.namedItem('spent') as HTMLInputElement).value),
            parts: (event.currentTarget.elements.namedItem('parts') as HTMLInputElement).value,
            tools: (event.currentTarget.elements.namedItem('tools') as HTMLInputElement).value,
            notes: (event.currentTarget.elements.namedItem('notes') as HTMLInputElement).value,
        }

        // Check if the mileage is higher than the current vehicle's mileage and update it
        if (newEntry.mileage > vehicle.mileage) {
            vehicle.mileage = newEntry.mileage
        }
        // Add the new journal entry to the vehicle's journalEntries array
        const updatedVehicle = { ...vehicle, journalEntries: [...vehicle.journalEntries ?? [], newEntry] }

        // Send the updated vehicle data to the server
        const res = await fetch(`/api/vehicle/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedVehicle),
        })

        if (res.ok) {
            // If the server responded with a success status, update the local state
            const updatedVehicles = await res.json()
            onAddEntry(updatedVehicle)
            await update({ image: updatedVehicles })
            setIsOpen(prevState => !prevState)
        } else {
            // If the server responded with an error status, handle the error
            console.error('Error adding journal entry')
        }
    }

    return (
        <Box justifyContent='center' sx={{m:1}}>
            {!isOpen ? (
                <Button
                    variant='contained'
                    startIcon={<AddIcon />}
                    onClick={() => setIsOpen(true)}
                    >
                    <Typography variant='overline' >Journal Entry</Typography>
                </Button>
            ) : (
                <Paper elevation={3} sx={{ p: 2, m: 2 }}>
                    <Typography variant='h6' gutterBottom>
                        Add Journal Entry
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={7}>
                                <TextField
                                    select
                                    label='Service'
                                    name='service'
                                    type='text'
                                    margin='dense'
                                    fullWidth
                                    required
                                    defaultValue='Upgrade'
                                    InputProps={{
                                        startAdornment: <InputAdornment position='start'>〄</InputAdornment>,
                                    }}
                                >
                                    <MenuItem value={'Maintenance'}>Maintenance</MenuItem>
                                    <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                                    <MenuItem value={'Repair'}>Repair</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={6} sm={5}>
                                <TextField
                                    label='Mileage'
                                    name='mileage'
                                    type='number'
                                    defaultValue={vehicle.mileage}
                                    margin='dense'
                                    fullWidth
                                    required
                                    InputProps={{
                                        startAdornment: <InputAdornment position='start'>🛣️</InputAdornment>,
                                    }}
                                />
                                
                            </Grid>
                            <Grid item xs={7} sm={7}>
                                <TextField
                                    label='Date'
                                    name='date'
                                    type='date'
                                    defaultValue={new Date().toLocaleDateString('en-CA')} // Current date
                                    margin='dense'
                                    fullWidth
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position='start'>📆</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5} sm={5}>
                                <TextField
                                    label='Spent'
                                    name='spent'
                                    type='number'
                                    margin='dense'
                                    fullWidth
                                    InputProps={{
                                        startAdornment: <InputAdornment position='start'>💸</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label='Parts'
                                    name='parts'
                                    type='text'
                                    margin='dense'
                                    fullWidth
                                    InputProps={{
                                        startAdornment: <InputAdornment position='start'>🔩</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label='Tools'
                                    name='tools'
                                    type='text'
                                    margin='dense'
                                    fullWidth
                                    InputProps={{
                                        startAdornment: <InputAdornment position='start'>🔧</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label='Notes'
                                    name='notes'
                                    type='text'
                                    margin='dense'
                                    fullWidth
                                    required
                                    InputProps={{
                                        startAdornment: <InputAdornment position='start'>📝</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <FormControlLabel
                                    label='Future?'
                                    control={
                                        <Checkbox
                                            name='future'
                                            color='primary'
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type='submit' variant='contained' color='primary' sx={{ my: 1 }}>
                                    Submit
                                </Button>
                                <Button variant='contained' color='secondary' sx={{ m: 1 }} onClick={() => setIsOpen(false)}>
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

export default AddJournalEntry
