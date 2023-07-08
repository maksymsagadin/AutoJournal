import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Box, Typography, Grid, Button, Tabs, Tab } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { JournalEntry, Vehicle } from '@/utils/types'
import EditVehicle from '@/components/Forms/EditVehicle'
import AddJournalEntry from './Forms/AddJournalEntry'
import ImportButton from '@/components/ImportButton'
import JournalEntryCard from '@/components/JournalEntryCard'
import SpentChart from '@/components/SpentChart'
import TimelineComponent from '@/components/Timeline'

interface SelectedVehicleProps {
    vehicle: Vehicle
    onEdit: (vehicle: Vehicle) => void
    onDelete: (vehicle: Vehicle) => void
}

const SelectedVehicle: React.FC<SelectedVehicleProps> = ({ vehicle, onEdit, onDelete }) => {
    const { update } = useSession()
    const [isEditing, setIsEditing] = useState(false)
    const [tab, setTab] = useState(0)
    const journalEntries = vehicle.journalEntries?.filter(entry => !entry.future)
    const todoEntries = vehicle.journalEntries?.filter(entry => entry.future).sort((a, b) => b.mileage - a.mileage)
    const sortedEntries =  vehicle.journalEntries?.filter(entry => !entry.future).sort((a, b) => b.mileage - a.mileage)

    const tabStyles = {
        '&.Mui-selected': {
            border: '2px solid',
            borderColor: 'primary.main',
            borderBottom: 'transparent',
            background: 'linear-gradient(to bottom, #0171b9, transparent)',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '5px 5px 0 0',
        },
        border: '1px solid',
        borderColor: 'slate.500',
        borderRadius: '5px 5px 0 0',
        transition: '0.5s',
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue)
    }

    const handleEditEntry = async (updatedEntry: JournalEntry) => {
        if (vehicle?.journalEntries) {
            // Check if the mileage is higher than the current vehicle's mileage and update it
            if (Number(updatedEntry.mileage) > Number(vehicle.mileage)) {
                vehicle.mileage = updatedEntry.mileage
            }
            // Update vehicle with the updated journal entry
            const entryIndex = vehicle.journalEntries.findIndex(entry => entry.id === updatedEntry.id)
            // If entry is found aka if entry isn't not found
            if (entryIndex !== -1) {
                const updatedEntries = [...vehicle.journalEntries]
                updatedEntries[entryIndex] = updatedEntry
                const updatedVehicle = { ...vehicle, journalEntries: updatedEntries }
                // Update Vehicle
                // Call your API endpoint to update server data
                const result = await fetch('/api/vehicle/edit', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedVehicle),
                })
                // If the server responded with a success status
                if (result.ok) { 
                    // update the local state
                    onEdit(updatedVehicle)
                    // update the session image with updated data
                    const updatedVehicles = await result.json()
                    await update({ image: updatedVehicles })
                } else {
                    // If the server responded with an error status, handle the error
                    console.error('Error editing vehicle')
                }
            }
        }
    }

    const handleDeleteEntry = async (entryToDelete: JournalEntry) => {
        if (vehicle?.journalEntries) {
            const updatedEntries = vehicle.journalEntries.filter(entry => entry.id !== entryToDelete.id)
            const updatedVehicle = { ...vehicle, journalEntries: updatedEntries }
            // Update Vehicle
            // Call your API endpoint to update server data
            const result = await fetch('/api/vehicle/edit', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedVehicle),
            })
            // If the server responded with a success status
            if (result.ok) {
                // update the local state
                onEdit(updatedVehicle)
                // update the session image with updated data
                const updatedVehicles = await result.json()
                await update({ image: updatedVehicles })
            } else {
                // If the server responded with an error status, handle the error
                console.error('Error editing vehicle')
            }
        }
    }

    if (isEditing) {
        return (
            <Box>
                <EditVehicle 
                    vehicle={vehicle} 
                    onEdit={(updatedVehicle: Vehicle) => {
                        onEdit(updatedVehicle)
                        setIsEditing(false)
                    }}
                    onDelete={onDelete}
                    setIsEditing={setIsEditing}
                />
            </Box>
        )
    }

    return (
        <Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Typography variant='h5' component='h2'>
                    Selected Vehicle: {vehicle.name || `${vehicle.make} ${vehicle.model}`}
                </Typography>
                <Button sx={{m: 1}} variant='contained' endIcon={<EditIcon />} color='primary' onClick={() => setIsEditing(true)}>
                    <Typography variant='overline'>Edit</Typography>
                </Button>
            </Box>
            <Typography variant='h5' component='h4'>
                Vehicle: {vehicle.make} {vehicle.model}
            </Typography>
            <Typography variant='body1' component='p'>
                Year: {vehicle.year}
            </Typography>
            <Typography variant='body1' component='p'>
                Color: {vehicle.color}
            </Typography>
            <Typography variant='body1' component='p'>
                Odometer: {vehicle.mileage}
            </Typography>
            <Box display='flex' flexWrap='wrap' justifyContent='center' >
                <ImportButton vehicle={vehicle} onImport={onEdit} />
                <AddJournalEntry vehicle={vehicle} onAddEntry={onEdit} />
            </Box>
            <Tabs value={tab} variant='fullWidth' sx={{pt: 1}} TabIndicatorProps={{ style: { display: 'none' } }} onChange={handleTabChange}>
                <Tab label='Journal Entries' sx={tabStyles} />
                <Tab label='Todo Entries' sx={tabStyles} />
                <Tab label='Spent' sx={tabStyles} />
                <Tab label='History' sx={tabStyles} />
            </Tabs>
            {tab === 0 && (
                <Grid container sx={{m: 1}}>
                    {journalEntries?.length > 0 ? (
                        sortedEntries.map((entry, index) => (
                            <Grid item xs={12} sm={6} lg={4} xl={3} key={index}>
                                <JournalEntryCard entry={entry} onEdit={handleEditEntry} onDelete={handleDeleteEntry}/>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant='body1' component='p' sx={{m: 2}}>No journal entries yet.</Typography>
                    )}
                </Grid>
            )}
            {tab === 1 && (
               <Grid container sx={{m: 1}}>
                    {todoEntries?.length > 0 ? (
                        todoEntries.map((entry, index) => (
                            <Grid item xs={12} sm={6} lg={4} xl={3} key={index}>
                                <JournalEntryCard entry={entry} onEdit={handleEditEntry} onDelete={handleDeleteEntry}/>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant='body1' component='p' sx={{m: 2}}>No future journal entries yet.</Typography>
                    )}
                </Grid>
            )}
            {tab === 2 && (
                <>
                    <Typography variant='body1' component='p' sx={{m: 2}}>Do you really want to know how much you spent?...</Typography> 
                    <SpentChart journalEntries={journalEntries}/>
                </>
            )}
            {tab === 3 && (
                <>
                    <TimelineComponent journalEntries={journalEntries}/>
                </>
            )}
        </Box>
    )
}

export default SelectedVehicle
