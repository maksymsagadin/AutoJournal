import { useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import { Credentials } from '@/utils/types'

import NavBar from '@/components/NavBar'
import {Box, Link, Typography, TextField, Button, Stack} from '@mui/material'


const login: NextPage = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const router = useRouter()

  const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const credentials: Credentials = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    }
    
    //Validation
    if (!credentials.email.includes('@')) {
      alert('Invalid email')
      return
    }
    //Sign In
    const result = await signIn('credentials', {
        redirect: false,
        ...credentials
    })
    if (result?.error) {
      console.error(result.error)
      alert(`${result.error}`)
    } else {
      // Successful login
      router.push('/dashboard')
      setLoggedIn(prevState => !prevState)
    }
  }
  
  return (
    <>
      <NavBar />
      <Box sx={{ m: 6, mb: 8 }}>
        <Typography variant="h3" gutterBottom align="center">
          Log In
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="/signup" underline="always">
            Don't have an account?
          </Link>
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleLogIn} sx={{mx: 12, mt: 6 }}>
        <TextField
          autoFocus
          disabled={loggedIn}
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          type='email'
          required
        />
        <TextField
          fullWidth
          disabled={loggedIn}
          required
          name="password"
          label="Password"
          type="password"
          margin="normal"
        />
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            type="submit"
            disabled={loggedIn}
            sx={{ width: '100%', height: '4rem' }}
            >
            {loggedIn ? 'In progress…' : 'Log In'}
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default login