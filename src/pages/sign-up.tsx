import { useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { UserData } from '@/utils/types'

import NavBar from '@/components/NavBar'
import { Box, Grid, Link, Typography, TextField, Button, Stack } from '@mui/material'

const SignUp: NextPage = () => {
    const [submitted, setSubmitted] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { firstName, lastName, email, password }: UserData = {
            firstName: event.currentTarget.firstName.value,
            lastName: event.currentTarget.lastName.value,
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
        }
        try {
            setSubmitted(prevState => !prevState)
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            })
            //Await for data for any desirable next steps
            const response = await res.json()
            if (response.message === 'User already exists') {
                alert(`User with the email ${email} already exists, please login.`)
            } else {
                router.push('/log-in')
            }
        } catch (error) {
            console.error(error,'err')
        }
    }

    return (
        <>
            <NavBar />
            <Box sx={{ m: 6, mb: 8 }}>
                <Typography variant="h3" gutterBottom align="center">
                    Sign Up
                </Typography>
                <Typography variant="body2" align="center">
                    <Link href="/log-in" underline="always">
                        Already have an account?
                    </Link>
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} sx={{mx: 12, mt: 6 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            autoFocus
                            disabled={submitted}
                            fullWidth
                            label="First name"
                            name="firstName"
                            autoComplete="given-name"
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            disabled={submitted}
                            fullWidth
                            label="Last name"
                            name="lastName"
                            autoComplete="family-name"
                        />
                    </Grid>
                </Grid>
                <TextField
                    required
                    disabled={submitted}
                    fullWidth
                    label="Email"
                    name="email"
                    type='email'
                    margin="normal"
                    autoComplete="email"
                />
                <TextField
                    required
                    fullWidth
                    disabled={submitted}
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    margin="normal"
                />
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={submitted}
                        sx={{ width: '100%', height: '4rem' }}
                        >
                        {submitted ? 'In progress…' : 'Sign Up'}
                    </Button>
                </Stack>
            </Box>
        </>
    )
}

export default SignUp