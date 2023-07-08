import React from 'react'
import Button from '@mui/material/Button'
import Papa from 'papaparse'
import { Vehicle } from '@/utils/types'
import { Box, Tooltip, Typography } from '@mui/material'

interface ExportButtonProps {
    vehicle: Vehicle
}

const ExportButton: React.FC<ExportButtonProps> = ({ vehicle }) => {
    const handleExport = () => {
        const data = vehicle.journalEntries.map(entry => ({
            Service: entry.service,
            Mileage: entry.mileage,
            Date: entry.date,
            Notes: entry.notes,
            Parts: entry.parts,
            Tools: entry.tools,
            Spent: entry.spent,
            Future: entry.future,
        }))
        const csv = Papa.unparse(data)
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${vehicle.name}.csv`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <Box sx={{m:1}}>
            <Tooltip title='Export all journal entries for this vehicle to a CSV file. The file will be named after the vehicle.'>
                <Button variant='contained' color='info' onClick={handleExport}>
                    <Typography variant='overline' >Export</Typography>
                </Button>
            </Tooltip>
        </Box>
    )
}

export default ExportButton
