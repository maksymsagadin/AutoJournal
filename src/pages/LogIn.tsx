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

const Login: NextPage = () => {
  const [logIn, setLogIn] = useState(false)

  const handleLogIn = () => {
    setLogIn(prevState => !prevState)
  }

  return (
    <>
      <NavBar />
      <Box sx={{ m: 6, mb: 8 }}>
        <Typography variant="h3" gutterBottom align="center">
          Log In
        </Typography>
        <Typography variant="body2" align="center">
          <Link href="/SignUp" underline="always">
            Don't have an account?
          </Link>
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleLogIn} noValidate sx={{ mt: 6 }}>
        <TextField
          autoFocus
          disabled={logIn}
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          required
        />
        <TextField
          fullWidth
          disabled={logIn}
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
            disabled={logIn}
            onClick={handleLogIn}
            sx={{ width: '100%' }}
          >
            {logIn ? 'In progress…' : 'Log In'}
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default Login