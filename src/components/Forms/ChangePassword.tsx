import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'

const ChangePassword = () => {
    const [updatingPW, setUpdatingPW] = useState(false)

    const togglePasswordForm = () => {
        setUpdatingPW(prevState => !prevState)
    }

    const handleSubmitPasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { oldPW, newPW, confirmPW} = {
            oldPW: event.currentTarget.oldPW.value,
            newPW: event.currentTarget.newPW.value,
            confirmPW: event.currentTarget.confirmPW.value,
        }
        //Confirmed Password Validation
        if (newPW !== confirmPW) {
            alert('New Password does not match Confirmed Password. Please retype new passwords.')
            return
        }
        // Handle password change form submission
        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oldPW, newPW, }),
            })
            togglePasswordForm()

            //Await for data
            const response = await res.json()
            if (response.message) {
                alert (`${response.message}`)
            }
        } catch (error) {
            console.error(error,'err')
            togglePasswordForm()
        }

    }

    return (
        <>
            {!updatingPW ? (
                <Button variant="contained" sx={{ m: 1 }} onClick={togglePasswordForm} >
                    Change Password
                </Button>
            ) : (
                <Box component='form' onSubmit={handleSubmitPasswordChange} sx={{mx: 12, mt: 6 }}>
                    <TextField
                        type="password"
                        label="Old Password"
                        name='oldPW'
                        fullWidth
                        required
                        sx={{mt:1}}
                        />
                    <TextField
                        type="password"
                        label="New Password"
                        name='newPW'
                        fullWidth
                        required
                        sx={{mt:1}}
                        />
                    <TextField
                        type="password"
                        label="Confirm New Password"
                        name='confirmPW'
                        fullWidth
                        required
                        sx={{mt:1}}
                        />
                    <Box>
                        <Button type="submit" variant="contained" color="primary" sx={{ my: 1 }}>
                            Update Password
                        </Button>
                        <Button variant="contained" sx={{ m: 1 }} color="secondary" onClick={togglePasswordForm}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default ChangePassword