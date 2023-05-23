import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import logo from '../../public/autojournalLogo.png'

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
}

const NavBar = () => {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    const handleSignOut = async () => {
        await signOut()
        //After signing out, the user will automatically be redirected to the login page once there is no longer a session.
    }

    if (loading) {
        return null // Render nothing while loading
    }

    return (
        <AppBar position="sticky">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }} />
                <Link
                    variant="h6"
                    underline="none"
                    color="inherit"
                    href="/dashboard"
                    sx={{ display:'flex' }}
                    >
                    <Image src={logo} alt='logo for Auto Journal' priority height={75} width={75} />
                </Link>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    {!session ? (
                        <>
                            <Link
                                color="inherit"
                                variant="h6"
                                underline="none"
                                href="/login"
                                sx={rightLink}
                                >
                                {'Login'}
                            </Link>
                            <Link
                                variant="h6"
                                underline="none"
                                href="/signup"
                                sx={{ ...rightLink, color: 'secondary.main' }}
                                >
                                {'Sign Up'}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                color="inherit"
                                variant="h6"
                                underline="none"
                                href="/profile"
                                sx={rightLink}
                                >
                                {'Profile'}
                            </Link>
                            <Link
                                variant="h6"
                                underline="none"
                                component="button"
                                onClick={handleSignOut}
                                sx={{ ...rightLink, color: 'secondary.main' }}
                                >
                                {'Sign Out'}
                            </Link>
                        </>
                    )}
                    
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar