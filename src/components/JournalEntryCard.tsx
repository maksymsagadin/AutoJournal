import { useState } from 'react'
import { Card, CardContent, Typography, IconButton, Collapse, Grid, Button } from '@mui/material'
import { JournalEntry } from '@/utils/types'
import UnfoldMoreOutlinedIcon from '@mui/icons-material/UnfoldMoreOutlined' // expand
import UnfoldLessOutlinedIcon from '@mui/icons-material/UnfoldLessOutlined' // collapse
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CarRepairIcon from '@mui/icons-material/CarRepair' // service
import EventNoteIcon from '@mui/icons-material/EventNote' // date
import AttachMoneyIcon from '@mui/icons-material/AttachMoney' // spent
import SpeedIcon from '@mui/icons-material/Speed' // odometer
import SportsIcon from '@mui/icons-material/Sports' // parts
import ConstructionIcon from '@mui/icons-material/Construction' // tools
import DescriptionIcon from '@mui/icons-material/Description' // notes
import EditJournalEntry from './Forms/EditJournalEntry'

interface JournalEntryCardProps {
    entry: JournalEntry,
    onEdit: (entry: JournalEntry) => void,
    onDelete: (entry: JournalEntry) => void,
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry, onEdit, onDelete }) => {
    const [expanded, setExpanded] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleEdit = (updatedEntry: JournalEntry) => {
        onEdit(updatedEntry)
        setIsEditing(false)
    }

    const handleDelete = (entryToDelete: JournalEntry) => {
        onDelete(entryToDelete)
    }

    const handleExpandClick = () => {
        setExpanded(prevState => !prevState)
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
        <Card raised={!entry.spent} sx={{ m: 2 }}>
            <CardContent>
                <Grid container textAlign='left' spacing={2}>
                    <Grid item xs={6} sm={7}>
                        <Typography variant='h6' component='h2'>
                            <CarRepairIcon sx={{ verticalAlign: 'middle' }} /> : {entry.service}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={5}>
                        <Typography variant='h6' component='p'>
                            <SpeedIcon sx={{ verticalAlign: 'middle' }} /> : {entry.mileage}
                        </Typography>
                    </Grid>
                    <Grid item xs={7} sm={7}>
                        <Typography variant='overline' fontSize={'1.2rem'} component='p'>
                            <EventNoteIcon sx={{ verticalAlign: 'middle' }} /> : {new Date(entry.date).toISOString().split('T')[0]}
                        </Typography>
                    </Grid>
                    <Grid item xs={5} sm={5}>
                        <Typography variant='overline' fontSize={'1.2rem'} component='p'>
                            <AttachMoneyIcon sx={{ verticalAlign: 'middle' }} /> {entry.spent ? `: ${entry.spent}` : '~'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                    {!expanded ? (
                        <Typography variant='overline' fontSize={'1rem'} component='p'>
                            <DescriptionIcon sx={{ verticalAlign: 'middle' }} /> : {entry.notes.substring(0, 75)}...
                        </Typography>
                    ) : (
                        <Typography variant='overline' fontSize={'1rem'} component='p'>
                            <DescriptionIcon sx={{ verticalAlign: 'middle' }} /> : {entry.notes}
                        </Typography>
                    )}
                </Grid>
                    <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ width: '100%', padding: '0 1rem' }}>
                        {entry.parts && <Grid item xs={12}>
                            <Typography variant='overline' fontSize={'1.1rem'} component='p'>
                                <SportsIcon sx={{ verticalAlign: 'middle' }} />: {entry.parts}
                            </Typography>
                        </Grid>}
                        {entry.tools && <Grid item xs={12}>
                            <Typography variant='overline' fontSize={'1.1rem'} component='p'>
                                <ConstructionIcon sx={{ verticalAlign: 'middle' }} /> : {entry.tools}
                            </Typography>
                        </Grid>}
                    </Collapse>
                    <Grid item textAlign={'center'} xs={12}>
                        <Button endIcon={<EditIcon />} variant='contained' color='primary' onClick={() => setIsEditing(true)}>
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
                            <>
                                <Button sx={{m: 1, px:2}} startIcon={<DeleteIcon />} variant='outlined' color='error' onClick={() => setIsDeleting(prevState => !prevState)}>
                                    <Typography variant='overline'>Del</Typography>
                                </Button>
                                <IconButton  onClick={handleExpandClick}>
                                    {expanded ? <UnfoldLessOutlinedIcon /> : <UnfoldMoreOutlinedIcon />}
                                </IconButton>
                            </>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default JournalEntryCard
