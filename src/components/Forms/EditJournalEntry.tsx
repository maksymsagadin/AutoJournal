import { useState } from 'react'
import { JournalEntry } from '@/utils/types'

import { Box, Button, Checkbox, FormControlLabel, Grid, InputAdornment, MenuItem, TextField } from '@mui/material'
import CarRepairIcon from '@mui/icons-material/CarRepair' // service
import SpeedIcon from '@mui/icons-material/Speed' // odometer
import EventNoteIcon from '@mui/icons-material/EventNote' // date
import AttachMoneyIcon from '@mui/icons-material/AttachMoney' // spent
import DescriptionIcon from '@mui/icons-material/Description' // notes
import SportsIcon from '@mui/icons-material/Sports' // parts
import ConstructionIcon from '@mui/icons-material/Construction' // tools


interface EditJournalEntryProps {
    entry: JournalEntry,
    onEdit: (entry: JournalEntry) => void,
    onCancel: () => void,
}

const EditJournalEntry: React.FC<EditJournalEntryProps> = ({ entry, onEdit, onCancel }) => {
    const [editedEntry, setEditedEntry] = useState(entry)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        let value: string | number = event.target.value = event.target.value
        if (event.target.name === 'spent' || event.target.name === 'mileage') {
            value = parseInt(value)
        }
        setEditedEntry({
            ...editedEntry,
            [event.target.name]: value
        })
    }

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onEdit(editedEntry)
    }

    return (
        <Box component='form' onSubmit={handleSave} sx={{ m: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={7}>
                    <TextField
                        select
                        label='Service'
                        name='service'
                        value={editedEntry.service}
                        onChange={handleChange}
                        type='text'
                        margin='dense'
                        fullWidth
                        required
                        InputProps={{
                            startAdornment: <InputAdornment position='start'><CarRepairIcon /></InputAdornment>,
                        }}
                    >
                        <MenuItem value={'Service'}>Service</MenuItem>
                        <MenuItem value={'Upgrade'}>Upgrade</MenuItem>
                        <MenuItem value={'Repair'}>Repair</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={6} sm={5}>
                    <TextField
                        label='Mileage'
                        name='mileage'
                        type='number'
                        value={editedEntry.mileage}
                        onChange={handleChange}
                        margin='dense'
                        fullWidth
                        required
                        InputProps={{
                            startAdornment: <InputAdornment position='start'><SpeedIcon /></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={6} sm={7}>
                    <TextField
                        label='Date'
                        name='date'
                        type='date'
                        value={new Date(editedEntry.date).toISOString().split('T')[0]} // Current date
                        onChange={handleChange}
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
                </Grid>
                <Grid item xs={6} sm={5}>
                    <TextField
                        label='Spent'
                        name='spent'
                        type='number'
                        value={editedEntry.spent}
                        onChange={handleChange}
                        margin='dense'
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position='start'><AttachMoneyIcon /></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label='Notes'
                        name='notes'
                        value={editedEntry.notes}
                        onChange={handleChange}
                        margin='dense'
                        fullWidth
                        required
                        multiline
                        InputProps={{
                            startAdornment: <InputAdornment position='start'><DescriptionIcon /></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label='Parts'
                        name='parts'
                        value={editedEntry.parts}
                        onChange={handleChange}
                        margin='dense'
                        fullWidth
                        multiline
                        InputProps={{
                            startAdornment: <InputAdornment position='start'><SportsIcon /></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        label='Tools'
                        name='tools'
                        value={editedEntry.tools}
                        onChange={handleChange}
                        margin='dense'
                        fullWidth
                        multiline
                        InputProps={{
                            startAdornment: <InputAdornment position='start'><ConstructionIcon /></InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        label='Future Entry?'
                        control={
                            <Checkbox
                                name='future'
                                checked={editedEntry.future}
                                onChange={(event) => setEditedEntry({ ...editedEntry, future: event.target.checked })}
                                color='primary'
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type='submit' variant='contained' color='primary' sx={{ my: 1 }}>
                        Save
                    </Button>
                    <Button variant='contained' color='secondary' sx={{ m: 1 }} onClick={onCancel}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default EditJournalEntry
