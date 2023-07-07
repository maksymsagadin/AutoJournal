import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { JournalEntry } from '@/utils/types'

interface BarChartComponentProps {
    journalEntries: JournalEntry[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']

const BarChartComponent: React.FC<BarChartComponentProps> = ({ journalEntries }) => {
    const chartData = journalEntries.reduce((sum, entry) => {
        const existingService = sum.find(item => item.name === entry.service)
        if (existingService) {
            existingService.amount += Number(entry.spent)
        } else {
            sum.push({ name: entry.service, amount: Number(entry.spent) })
        }
        return sum
    }, [] as { name: string, amount: number }[])
    return (
        <BarChart width={350} height={300} data={chartData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='amount'>
                {
                    chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))
                }
            </Bar>
        </BarChart>
    )
}

export default BarChartComponent