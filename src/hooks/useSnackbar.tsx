import { useState } from 'react'

const useSnackbar = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success')

    const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
        setSnackbarMessage(message)
        setSnackbarSeverity(severity)
        setSnackbarOpen(true)
    }

    const closeSnackbar = () => {
        setSnackbarOpen(false)
    }

    return {
        snackbarOpen,
        snackbarMessage,
        snackbarSeverity,
        showSnackbar,
        closeSnackbar
    }
}

export default useSnackbar
