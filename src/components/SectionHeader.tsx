import { Box, Typography } from '@mui/material'
import { keyframes } from '@mui/system'

const fadeIn = keyframes`
    0% {
        opacity: 0
    }
    100% {
        opacity: 1
    }
`

const SectionHeader = ({ children }) => (
    <Box 
        sx={{ 
            position: 'relative',
            backgroundColor: 'primary.main',
            border: '1px solid',
            borderColor: 'secondary.main',
            borderRadius: 2,
            width: '100%',
            animation: `${fadeIn} 5s`,
            '::after': {
                content: '""',
                position: 'absolute',
                bottom: 32,
                width: '100%',
                height: '100px',
                background: 'linear-gradient(270deg, rgba(0, 238, 255, 0.5), rgba(8, 182, 182, 0.2))',
                clipPath: 'polygon(100% 58%, 12% 58%, 100% 100%)',
                zIndex: 1
            }
        }}
    >
    <Typography variant='h4' component='h2' sx={{ padding: 2}}>{children}</Typography>
  </Box>
)

export default SectionHeader
