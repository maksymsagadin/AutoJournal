import { useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import NavBar from '@/components/NavBar'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

interface SignUpData {
    firstName: string
    lastName: string
    email: string
    password: string
}

const signup: NextPage = () => {
    const [sent, setSent] = useState(false)
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { firstName, lastName, email, password }: SignUpData = {
            firstName: event.currentTarget.firstName.value,
            lastName: event.currentTarget.lastName.value,
            email: event.currentTarget.email.value,
            password: event.currentTarget.password.value,
        }
        //Validation
        if (!email || !email.includes('@') || !password) {
            alert('Invalid email / password.')
            return
        }
        try {
            setSent(prevState => !prevState)
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                }),
            })
            //Await for data for any desirable next steps
            const response = await res.json()
            if (response.message === 'User already exists') {
                alert(`User with the email ${email} already exists, please login.`)
            } else {
                router.push('/login')
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
                    <Link href="/login" underline="always">
                        Already have an account?
                    </Link>
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mx: 12, mt: 6 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoFocus
                            disabled={sent}
                            fullWidth
                            label="First name"
                            name="firstName"
                            autoComplete="given-name"
                            />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            disabled={sent}
                            fullWidth
                            label="Last name"
                            name="lastName"
                            autoComplete="family-name"
                        />
                    </Grid>
                </Grid>
                <TextField
                    required
                    disabled={sent}
                    fullWidth
                    label="Email"
                    name="email"
                    margin="normal"
                    autoComplete="email"
                />
                <TextField
                    required
                    fullWidth
                    disabled={sent}
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
                        disabled={sent}
                        sx={{ width: '100%', height: '4rem' }}
                        >
                        {sent ? 'In progress…' : 'Sign Up'}
                    </Button>
                </Stack>
            </Box>
        </>
    )
}

export default signup