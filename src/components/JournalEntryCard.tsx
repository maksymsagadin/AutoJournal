import { useState } from 'react'
import { Button, Card, CardContent, Grid, IconButton, Typography } from '@mui/material'
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
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Typography variant="h6" component="h2">
                            Service: {entry.service}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                        <Typography variant="body1" component="p">
                            Date: {new Date(entry.date).toISOString().split('T')[0]}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                        <Typography variant="body1" component="p">
                            Mileage: {entry.mileage}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sm={3}>
                        <Typography variant="body1" component="p">
                            {entry.spent ? `Spent: ${entry.spent}`: 'Spent: ~'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="p">
                            Parts: {entry.parts}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="body1" component="p">
                            Tools: {entry.tools}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="p">
                            Notes: {entry.notes}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <IconButton onClick={() => setIsEditing(true)}>
                            <EditIcon />
                        </IconButton>
                        {isDeleting ? (
                            <>
                                <Button variant="contained" color="error" onClick={() => onDelete(entry)}>
                                    Click again to delete
                                </Button>
                                <Button variant="contained" color="secondary" sx={{ m: 1 }} onClick={() => setIsDeleting(false)}>
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <IconButton onClick={() => setIsDeleting(prevState => !prevState)}>
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default JournalEntryCard
