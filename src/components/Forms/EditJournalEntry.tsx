import { useState } from 'react'
import { Box, Button, Checkbox, FormControlLabel, Grid, InputAdornment, MenuItem, TextField } from '@mui/material'
import { JournalEntry } from '@/utils/types'

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
                        value={editedEntry.mileage}
                        onChange={handleChange}
                        margin='dense'
                        fullWidth
                        required
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>🛣️</InputAdornment>,
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
                            startAdornment: <InputAdornment position='start'>📆</InputAdornment>,
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
                            startAdornment: <InputAdornment position='start'>💸</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label='Parts'
                        name='parts'
                        value={editedEntry.parts}
                        onChange={handleChange}
                        margin='dense'
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>🔩</InputAdornment>,
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label='Tools'
                        name='tools'
                        value={editedEntry.tools}
                        onChange={handleChange}
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
                        value={editedEntry.notes}
                        onChange={handleChange}
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
