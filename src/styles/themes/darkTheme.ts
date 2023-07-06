import { ThemeOptions } from '@mui/material/styles'

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#0171b9',
      contrastText: '#fff',
    },
    secondary: {
      main: '#014785',
      contrastText: '#fff', 
    },
    background: {
      default: '#121212', 
      paper: '#1D1D1D', 
    },
    text: {
      primary: '#E4E4E4', 
      secondary: '#A4A4A4', 
    },
    error: {
      main: '#f44336', 
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3', 
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400, 
    fontWeightMedium: 600, 
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 4,
  },
  spacing: 8, 
}

export default darkTheme
