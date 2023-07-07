import { useState } from 'react'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab'
import { Box, Typography, Modal } from '@mui/material'
import TireRepairIcon from '@mui/icons-material/TireRepair'
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import CarRepairIcon from '@mui/icons-material/CarRepair'
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave'
import HealingIcon from '@mui/icons-material/Healing'
import { JournalEntry } from '@/utils/types'

interface TimelineProps {
    journalEntries: JournalEntry[]
}

const TimelineComponent: React.FC<TimelineProps> = ({ journalEntries }) => {
    const [open, setOpen] = useState(false)
    const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)

    const handleOpen = (entry: JournalEntry) => {
        setSelectedEntry(entry)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const getIcon = (service: string) => {
        switch(service) {
            case 'Maintenance':
                return <CarRepairIcon />
            case 'Upgrade':
                return <SportsMotorsportsIcon />
            case 'Repair':
                return <HealingIcon />
            default:
                return <TimeToLeaveIcon />
        }
    }

    return (
        <>
            <Timeline position='alternate'>
                {journalEntries.map((entry, index) => (
                    <TimelineItem key={index} onClick={() => handleOpen(entry)}>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                            >
                            {new Date(entry.date).toISOString().split('T')[0]} {/* Display the date */}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot>
                                {getIcon(entry.service)}
                            </TimelineDot>
                            {index < journalEntries.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                            <Typography color='primary.main'>{entry.service}</Typography>
                            <Typography>{`Odo: ${entry.mileage}`}</Typography>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: 400, 
                    bgcolor: 'background.paper', 
                    border: '2px solid #000', 
                    boxShadow: 24, 
                    p: 4 
                }}>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 1 }}>
                        {selectedEntry && getIcon(selectedEntry.service)}
                        <Typography id='modal-modal-title' variant='h6' component='h2'>
                            {selectedEntry?.service}
                        </Typography>
                    </Box>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        Spent: ${selectedEntry?.spent}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        Mileage: {selectedEntry?.mileage}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        Date: {selectedEntry?.date ? new Date(selectedEntry.date).toISOString().split('T')[0] : ''}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        Parts: {selectedEntry?.parts}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        Tools: {selectedEntry?.tools}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        Notes: {selectedEntry?.notes}
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default TimelineComponent
