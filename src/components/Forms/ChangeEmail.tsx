import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { TextField, Button, Box } from '@mui/material'
import { Credentials } from '@/utils/types'
import { signIn } from 'next-auth/react'


const ChangeEmail = () => {
    const [updatingEmail, setUpdatingEmail] = useState(false)
    const { update } = useSession()

    const toggleEmailForm = () => {
        setUpdatingEmail(prevState => !prevState)
    }

    const handleSubmitEmailChange = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const { newEmail, confirmEmail, confirmPW} = {
            newEmail: event.currentTarget.newEmail.value,
            confirmEmail: event.currentTarget.confirmEmail.value,
            confirmPW: event.currentTarget.confirmPW.value
        }
        const credentials: Credentials = {
            email: newEmail,
            password: confirmPW,
        }

        //Confirmed Email Validation
        if (newEmail !== confirmEmail) {
            alert('New email does not match Confirmed email. Please retype new emails.')
            return
        }
        // Handle email change form submission
        try {
            const res = await fetch('/api/auth/change-email', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newEmail, confirmPW }),
            })
            toggleEmailForm()

            //Await for data for any desirable next steps
            const response = await res.json()
            if (response.message) {
                alert (`${response.message}`)
            }
            // Sign in the user with the new email
            const result = await signIn('credentials', {
                redirect: false,
                ...credentials
            })
            if (result?.error) {
                throw new Error(result.error)
            }
        } catch (error) {
            console.error(error,'err')
            toggleEmailForm()
        }
    }

    return (
        <>
            {!updatingEmail ? (
                <Button variant="contained" sx={{ m: 1 }} onClick={toggleEmailForm}>
                    Change Email
                </Button>
            ) : (
                <Box component='form' onSubmit={handleSubmitEmailChange} sx={{mx: 12, mt: 6 }}>
                    <TextField
                        type="email"
                        label="New Email"
                        name='newEmail'
                        fullWidth
                        required
                        sx={{mt:1}}
                        />
                    <TextField
                        type="email"
                        label="Confirm New Email"
                        name='confirmEmail'
                        fullWidth
                        required
                        sx={{mt:1}}
                        />
                    <TextField
                        type="password"
                        label="Password"
                        name='confirmPW'
                        fullWidth
                        required
                        sx={{mt:1}}
                        />
                    <Button type="submit" variant="contained" sx={{mt:1}}>
                        Update Email
                    </Button>
                </Box>
            )}
        </>
    )
}

export default ChangeEmail