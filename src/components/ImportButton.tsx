import React from 'react'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Papa from 'papaparse'

import { JournalEntry, Vehicle } from '@/utils/types'
import { Box } from '@mui/material'

interface ImportButtonProps {
    vehicle: Vehicle
    onImport: (vehicle: Vehicle) => void
}

const ImportButton: React.FC<ImportButtonProps> = ({ vehicle, onImport }) => {
    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    if (results.data) {
                        const newEntries = results.data.map((row: any) => ({
                            service: row.Service,
                            mileage: row.Mileage,
                            date: row.Date,
                            notes: row.Notes,
                            // Add other fields as needed
                        }))
                        vehicle.journalEntries = [...vehicle.journalEntries, ...newEntries]
                        onImport(vehicle)
                    }
                },
            })
        }
    }

    return (
        <Box sx={{m:1}}>
            <Tooltip title='Header values must match the journal entry fields. Service, Mileage, Date, and Notes are required. Please update your file before importing.'>
                <Button variant='outlined' component='label' sx={{p:1}}>
                    Import from CSV
                    <input
                        type='file'
                        hidden
                        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                        onChange={handleImport}
                    />
                </Button>
            </Tooltip>
        </Box>
    )
}

export default ImportButton
