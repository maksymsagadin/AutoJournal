import { useState } from 'react'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab'
import { Box, Typography, Modal } from '@mui/material'
import TireRepairIcon from '@mui/icons-material/TireRepair'
import SportsMotorsportsOutlinedIcon from '@mui/icons-material/SportsMotorsportsOutlined'
import CarRepairOutlinedIcon from '@mui/icons-material/CarRepairOutlined'
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave'
import HealingIcon from '@mui/icons-material/Healing'
import { JournalEntry } from '@/utils/types'

interface TimelineProps {
    journalEntries: JournalEntry[]
}

const TimelineChart: React.FC<TimelineProps> = ({ journalEntries }) => {
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
                return (
                    <TimelineDot color='primary' >
                        <CarRepairOutlinedIcon />
                    </TimelineDot>
                )
            case 'Upgrade':
                return (
                    <TimelineDot color='success' variant='outlined'>
                        <SportsMotorsportsOutlinedIcon />
                    </TimelineDot>
                )
            case 'Repair':
                return (
                    <TimelineDot color='warning' variant='outlined'>
                        <HealingIcon />
                    </TimelineDot>
                )
            default:
                return (
                    <TimelineDot>
                        <TimeToLeaveIcon />
                    </TimelineDot>
                )
        }
    }

    return (
        <>
            <Timeline position='alternate'>
                {journalEntries.map((entry, index) => (
                    <TimelineItem key={index} onClick={() => handleOpen(entry)}>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align='right'
                            variant='body2'
                            color='text.secondary'
                            >
                            {new Date(entry.date).toISOString().split('T')[0]}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                                {getIcon(entry.service)}
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
                        {getIcon(selectedEntry?.service)}
                        <Typography id='modal-modal-title' variant='h6' component='h2' ml={1}>
                            {selectedEntry?.service}
                        </Typography>
                    </Box>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        💸: ${selectedEntry?.spent}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        🛣️ : {selectedEntry?.mileage}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        📆 : {selectedEntry?.date ? new Date(selectedEntry.date).toISOString().split('T')[0] : ''}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        🔩: {selectedEntry?.parts}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        🔧: {selectedEntry?.tools}
                    </Typography>
                    <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        📝 : {selectedEntry?.notes}
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default TimelineChart
