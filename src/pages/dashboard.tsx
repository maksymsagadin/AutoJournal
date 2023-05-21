import { NextPage, GetServerSideProps } from 'next'
import type { Session } from 'next-auth'
import { useSession, getSession } from 'next-auth/react'

import { Box, Typography, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import NavBar from '@/components/NavBar'
const dashboard: NextPage = () => {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    // Access user information and vehicles property
  const user = session?.user
  const vehicles  = user?.image
  console.log(user, 'user')
  console.log(vehicles, 'vehicles')

//   const handleAddVehicle= async () = {}

    return (
        <> = 
            <NavBar />
            <Box mt={4} mx={2}>
                <Typography variant="h4" component="h1" gutterBottom>
                Welcome, {session?.user?.name}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                You have {vehicles?.length} vehicles
                </Typography>
                <Grid container spacing={2}>
                    {vehicles?.map((vehicle: {}, index: number) => (
                        <Grid item key={index}>
                            <Box
                                width={150}
                                height={150}
                                border="1px solid gray"
                                borderRadius={8}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                {vehicle}
                            </Box>
                        </Grid>
                    ))}
                    <Grid item>
                        <Box
                            component='button'
                            // onClick={handleAddVehicle}
                            width={150}
                            height={150}
                            border="1px dashed gray"
                            borderRadius={8}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            sx={{ cursor: 'pointer' }}
                            >
                            <AddIcon fontSize="large" />
                            Add Vehicle
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
        
    )
}

export const getServerSideProps: GetServerSideProps<{ session: Session | null }> = async (context) => {
    return {
        props: {
            session: await getSession(context),
        },
    }
}

export default dashboard