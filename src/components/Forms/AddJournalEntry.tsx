import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { v4 as uuidv4 } from 'uuid'
import { JournalEntry, Vehicle } from '@/utils/types'

import { Box, TextField, Checkbox, FormControlLabel, Button, Paper, Typography, Grid, InputAdornment, MenuItem, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import CarRepairIcon from '@mui/icons-material/CarRepair' // service
import SpeedIcon from '@mui/icons-material/Speed' // odometer
import EventNoteIcon from '@mui/icons-material/EventNote' // date
import AttachMoneyIcon from '@mui/icons-material/AttachMoney' // spent
import DescriptionIcon from '@mui/icons-material/Description' // notes
import SportsIcon from '@mui/icons-material/Sports' // parts
import ConstructionIcon from '@mui/icons-material/Construction' // tools

interface AddJournalEntryProps {
    vehicle: Vehicle,
    onAddEntry: (vehicle: Vehicle) => void
    showSnackbar: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void
}

const AddJournalEntry: React.FC<AddJournalEntryProps> = ({ vehicle, onAddEntry, showSnackbar }) => {
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
            showSnackbar('Journal entry added successfully!', 'success')
        } else {
            // If the server responded with an error status, handle the error
            showSnackbar('Journal entry not added!', 'error')
        }
    }

    return (
        <Box sx={{m:1}}>
            {!isOpen ? (
                <Button
                    variant='contained'
                    startIcon={<AddIcon />}
                    onClick={() => setIsOpen(true)}
                    >
                    <Typography variant='overline' >Journal Entry</Typography>
                </Button>
            ) : (
                <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
                    <Typography variant='h6' gutterBottom>
                        Add Journal Entry
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={7}>
                                <Tooltip title="Enter the type of service performed" placement='top' arrow enterTouchDelay={150} leaveTouchDelay={1500} >
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
                                            startAdornment: <InputAdornment position='start'><CarRepairIcon /></InputAdornment>,
                                        }}
                                    >
                                        <MenuItem value={'Service'}>Service</MenuItem>
                                        <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                                        <MenuItem value={'Repair'}>Repair</MenuItem>
                                        <MenuItem value={'Other'}>Other</MenuItem>
                                    </TextField>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={6} sm={5}>
                                <Tooltip title="Enter the mileage of the vehicle during this service" placement='top' arrow enterTouchDelay={150} leaveTouchDelay={1500}>
                                    <TextField
                                        label='Mileage'
                                        name='mileage'
                                        type='number'
                                        defaultValue={vehicle.mileage}
                                        margin='dense'
                                        fullWidth
                                        required
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'><SpeedIcon /></InputAdornment>,
                                        }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={7} sm={7}>
                                <Tooltip title="Enter the date this service was performed" placement='top' arrow enterTouchDelay={150} leaveTouchDelay={1500}>
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
                                            startAdornment: <InputAdornment position='start'><EventNoteIcon /></InputAdornment>,
                                        }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={5} sm={5}>
                                <Tooltip title="How much was spent overall?" placement='top' arrow enterTouchDelay={150} leaveTouchDelay={1500}>
                                    <TextField
                                        label='Spent'
                                        name='spent'
                                        type='number'
                                        margin='dense'
                                        fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'><AttachMoneyIcon /></InputAdornment>,
                                        }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12}>
                            <Tooltip title="What did you do?" placement='top' arrow enterTouchDelay={150} leaveTouchDelay={1500}>
                                    <TextField
                                        label='Notes'
                                        name='notes'
                                        type='text'
                                        margin='dense'
                                        fullWidth
                                        required
                                        multiline
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'><DescriptionIcon /></InputAdornment>,
                                        }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12}>
                                <Tooltip title="What part(s) did you install or replace?" placement='top' arrow enterTouchDelay={150} leaveTouchDelay={1500}>
                                    <TextField
                                        label='Parts'
                                        name='parts'
                                        type='text'
                                        margin='dense'
                                        fullWidth
                                        multiline
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'><SportsIcon /></InputAdornment>,
                                        }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12}>
                                <Tooltip title="What tool(s) did you need?" placement='top' arrow enterTouchDelay={150} leaveTouchDelay={1500}>
                                    <TextField
                                        label='Tools'
                                        name='tools'
                                        type='text'
                                        margin='dense'
                                        fullWidth
                                        multiline
                                        InputProps={{
                                            startAdornment: <InputAdornment position='start'><ConstructionIcon /></InputAdornment>,
                                        }}
                                    />
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Future service or already completed?" placement='right' arrow enterTouchDelay={150} leaveTouchDelay={1500}>
                                    <FormControlLabel
                                        label='Future Entry?'
                                        control={
                                            <Checkbox
                                                name='future'
                                                color='primary'
                                            />
                                        }
                                    />
                                </Tooltip>
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
