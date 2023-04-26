import { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { NextPage } from 'next'
import NavBar from '@/components/NavBar'

const SignUp: NextPage = () => {
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    setSent(prevState => !prevState)
  }

  return (
    <>
        <NavBar />
        <Box sx={{ m: 6, mb: 8 }}>
            <Typography variant="h3" gutterBottom align="center">
                Sign Up
            </Typography>
            <Typography variant="body2" align="center">
                <Link href="/LogIn" underline="always">
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
                        autoComplete="given-name"
                        fullWidth
                        label="First name"
                        name="firstName"
                        required
                        />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                    disabled={sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                    />
                </Grid>
            </Grid>
            <TextField
            autoComplete="email"
            disabled={sent}
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            required
            />
            <TextField
            fullWidth
            disabled={sent}
            required
            name="password"
            autoComplete="new-password"
            label="Password"
            type="password"
            margin="normal"
            />
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
                <Button
                    variant="contained"
                    type="submit"
                    disabled={sent}
                    onClick={handleSubmit}
                    sx={{ width: '100%', height: '4rem' }}
                    >
                    {sent ? 'In progress…' : 'Sign Up'}
                </Button>
            </Stack>
        </Box>
    </>
  )
}

export default SignUp