import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { JournalEntry } from '@/utils/types'
import { Box, Typography } from '@mui/material'

interface SpentChartProps {
    journalEntries: JournalEntry[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

const SpentChart: React.FC<{ journalEntries: JournalEntry[] }> = ({ journalEntries }) => {
    const [chartData, totalSpent] = useMemo(() => {
        const data = journalEntries.reduce((total, entry) => {
            const existingService = total.find(item => item.name === entry.service)
            if (existingService) {
                existingService.amount += Number(entry.spent)
            } else {
                total.push({ name: entry.service, amount: Number(entry.spent) })
            }
            return total
        }, [] as { name: string, amount: number }[])
        const totalSpent = data.reduce((total, item) => total + item.amount, 0)
        return [data, totalSpent]
    }, [journalEntries])

    return (
        <>  
            <Typography variant='h6' sx={{ flexGrow: 1, textAlign: 'center', marginTop: 2 }}>
                Total Spent: ${totalSpent.toFixed(2)}
            </Typography>
            <Box display='flex' justifyContent='center' padding={3} flexWrap='wrap'>
                <ResponsiveContainer width='100%' height={275}>
                    <PieChart>
                        <Pie dataKey='amount' data={chartData} cx='50%' cy='50%' outerRadius={100} fill='#8884d8' label>
                            {chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <ResponsiveContainer width='100%' height={400}>
                    <BarChart data={chartData}>
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke='#f5f5f5' />
                        <Bar dataKey='amount'>
                            {chartData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </>
    )
}

export default SpentChart