import React from 'react'
import {Box, Button, Tooltip, Typography} from '@mui/material/'
import { v4 as uuidv4 } from 'uuid'
import Papa from 'papaparse'
import { useSession } from 'next-auth/react'
import { Vehicle } from '@/utils/types'

interface ImportButtonProps {
    vehicle: Vehicle
    onImport: (vehicle: Vehicle) => void
}

const ImportButton: React.FC<ImportButtonProps> = ({ vehicle, onImport }) => {
    const { update } = useSession()

    const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const file = event.target.files?.[0]
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: async (results) => {
                    if (results.data) {
                        let errorCount = 0
                        const newEntries = results.data
                            // Filter out empty rows before mapping over
                            .filter(row => Object.values(row).some(value => value))
                            .map((row: any) => {
                            // Ensure required fields are not empty
                            if (!row.Service || !row.Mileage || !row.Date || !row.Notes) {
                                console.error('Missing required field(s) in row:', row)
                                errorCount++
                                return null
                            }
    
                            // Ensure Mileage and Spent are numbers
                            const mileage = Number(row.Mileage)
                            const spent = row.Spent ? Number(row.Spent) : undefined
                            if (isNaN(mileage) || (row.Spent && isNaN(spent))) {
                                console.error('Mileage or Spent field is not a number in row:', row)
                                errorCount++
                                return null
                            }
    
                            // Ensure Date is a valid date
                            const date = new Date(row.Date)
                            if (isNaN(date.getTime())) {
                                console.error('Date field is not a valid date in row:', row)
                                errorCount++
                                return null
                            }
    
                            // Ensure Future is a boolean
                            let future
                            if (row.Future !== undefined) {
                                future = row.Future.toLowerCase() === 'true'
                                if (typeof future !== 'boolean') {
                                    console.error('Future field is not a boolean in row:', row)
                                    errorCount++
                                    return null
                                }
                            }
    
                            return {
                                id: uuidv4(),
                                service: row.Service,
                                mileage,
                                date: date.toISOString(),
                                notes: row.Notes,
                                tools: row.Tools || '',
                                parts: row.Parts || '',
                                spent,
                                future,
                            }
                        }).filter(Boolean) // Remove null entries
                        // Updated vehicle that has the new entries
                        const updatedVehicle = { ...vehicle, journalEntries: [...vehicle.journalEntries, ...newEntries] }
                        // Update the vehicle on the server
                        const res = await fetch(`/api/vehicle/edit`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedVehicle),
                        })

                        if (res.ok) {
                            const updatedVehicles = await res.json()
                            // update the local state
                            onImport(updatedVehicle)
                            // update the session image with updated data
                            await update({ image: updatedVehicles })
                        } else {
                            console.error('Error adding journal entry')
                        }
                        
                        if (errorCount > 0) {
                            alert(`Import completed with ${errorCount} error(s). Check the console for details.`)
                        } else {
                            alert('Import completed successfully!')
                        }
                    }
                },
            })
        }
    }

    return (
        <Box sx={{m:1}}>
            <Tooltip title='Import journal entries from a CSV file. The file must have headers that match the journal entry fields: Service, Mileage, Date, Notes, Parts, Tools, Spent, Future. Service, Mileage, Date, and Notes are required fields. The file must be in CSV format.'>
                <Button variant='contained' color='warning'>
                    <Typography variant='overline' >Import</Typography>
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
