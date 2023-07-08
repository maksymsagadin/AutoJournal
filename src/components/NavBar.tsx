import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { Box, AppBar, Toolbar, Link, Tooltip} from '@mui/material'
import logo from '../../public/autojournalLogo.png'

const rightLink = {
  fontSize: 14,
  color: 'common.white',
  ml: 1.75,
}

const NavBar = () => {
    const { data: session, status } = useSession()
    const loading = status === 'loading'

    const handleSignOut = async () => {
        //redirect to the login page.
        await signOut({ callbackUrl: '/log-in' })
    }
    if (loading) {
        return null // Render nothing while loading
    }

    return (
        <AppBar position='sticky'>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }} >
                    {!session ? (
                            <Link
                                color='inherit'
                                variant='h6'
                                underline='none'
                                href='/'
                                sx={rightLink}
                                >
                                {'Home'}
                            </Link>
                    ) : (
                        <Link
                            color='inherit'
                            variant='h6'
                            underline='none'
                            href='/dashboard'
                            sx={rightLink}
                            >
                            {'Dashboard'}
                        </Link>
                    )}
                </Box>
                <Tooltip title='Oh Hi!' arrow>
                    <Box sx={{ display:'flex', cursor: 'pointer' }}>
                        <Image src={logo} alt='logo for Auto Journal' priority height={75} width={75} />
                    </Box>
                </Tooltip>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    {!session ? (
                        <>
                            <Link
                                color='inherit'
                                variant='h6'
                                underline='none'
                                href='/log-in'
                                sx={rightLink}
                                >
                                {'Login'}
                            </Link>
                            <Link
                                variant='h6'
                                underline='none'
                                href='/sign-up'
                                sx={{ ...rightLink, color: 'primary.main' }}
                                >
                                {'Sign Up'}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                color='inherit'
                                variant='h6'
                                underline='none'
                                href='/profile'
                                sx={rightLink}
                                >
                                {'Profile'}
                            </Link>
                            <Link
                                variant='h6'
                                underline='none'
                                component='button'
                                onClick={handleSignOut}
                                sx={{ ...rightLink, color: '#bd1e30' }}
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