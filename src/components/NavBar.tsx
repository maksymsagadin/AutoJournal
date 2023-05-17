import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'

import logo from '../../public/autojournalLogo.png'
import Image from 'next/image'

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
}

function AppAppBar() {

    return (
        <AppBar position="sticky">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }} />
                <Link
                variant="h6"
                underline="none"
                color="inherit"
                href="/"
                sx={{ display:'flex' }}
                >
                    <Image src={logo} alt='logo for Auto Journal' priority height={75} width={75} />
                </Link>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
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
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default AppAppBar