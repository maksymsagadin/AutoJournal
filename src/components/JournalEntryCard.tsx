import { useState } from 'react'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { JournalEntry } from '@/utils/types'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import EditJournalEntry from './Forms/EditJournalEntry'

interface JournalEntryCardProps {
    entry: JournalEntry,
    onEdit: (entry: JournalEntry) => void,
    onDelete: (entry: JournalEntry) => void,
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const handleEdit = (updatedEntry: JournalEntry) => {
        onEdit(updatedEntry)
        setIsEditing(false)
    }

    const handleDelete = (entryToDelete: JournalEntry) => {
        onDelete(entryToDelete)
    }

    if (isEditing) {
        return (
            <EditJournalEntry 
                entry={entry} 
                onEdit={handleEdit} 
                onCancel={() => setIsEditing(false)} 
            />
        )
    }

    return (
        <Card sx={{ m: 2 }}>
            <CardContent>
                <Grid container textAlign='left' spacing={2}>
                    <Grid item xs={6} sm={7}>
                        <Typography variant='h6' component='h2'>
                            Service: {entry.service}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={5}>
                        <Typography variant='h6' component='p'>
                            🛣️ : {entry.mileage}
                        </Typography>
                    </Grid>
                    <Grid item xs={7} sm={7}>
                        <Typography variant='overline' fontSize={'1.2rem'} component='p'>
                            📆 : {new Date(entry.date).toISOString().split('T')[0]}
                        </Typography>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <Typography variant='overline' fontSize={'1.2rem'} component='p'>
                            {entry.spent ? `💸: ${entry.spent}`: '💸: ~'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='overline' fontSize={'1.1rem'} component='p'>
                            {entry.parts ? `🔩: ${entry.parts}` : ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant='overline' fontSize={'1.1rem'} component='p'>
                            {entry.tools ? `🔧: ${entry.tools}` : ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='overline' fontSize={'1rem'} component='p'>
                            📝 : {entry.notes}
                        </Typography>
                    </Grid>
                    <Grid item textAlign={'center'} xs={12}>
                        <Button variant='contained' color='primary' onClick={() => setIsEditing(true)}>
                            <EditIcon />
                            <Typography variant='overline'>Edit</Typography>
                        </Button>
                        {isDeleting ? (
                            <>
                                <Button sx={{m: 1}} variant='contained' color='error' onClick={() => onDelete(entry)}>
                                    Sure?
                                </Button>
                                <Button variant='contained' color='secondary' onClick={() => setIsDeleting(false)}>
                                    No
                                </Button>
                            </>
                        ) : (
                            <Button sx={{m: 1, px:2}} variant='outlined' color='error' onClick={() => setIsDeleting(prevState => !prevState)}>
                                <DeleteIcon />
                                <Typography variant='overline'>Del</Typography>
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default JournalEntryCard
