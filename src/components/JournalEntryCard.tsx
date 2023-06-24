import { Card, CardContent, Grid, Typography } from '@mui/material'
import { JournalEntry } from '@/utils/types'

interface JournalEntryCardProps {
    entry: JournalEntry
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({ entry }) => {
    return (
        <Card sx={{ m: 2 }}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" component="h2">
                            Service: {entry.service}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="body1" component="p">
                            Date: {new Date(entry.date).toLocaleDateString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="body1" component="p">
                            Spent: ${entry.spent}
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
                </Grid>
            </CardContent>
        </Card>
    )
}

export default JournalEntryCard
