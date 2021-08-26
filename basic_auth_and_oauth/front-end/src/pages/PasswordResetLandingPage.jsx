import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { PasswordResetSuccess } from './PasswordResetSuccess'
import { PasswordResetFail } from './PasswordResetFail'

export const PasswordResetLandingPage = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFail, setIsFail] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')

  const { passwordResetCode } = useParams()

  const onResetClicked = async () => {
    try {
      await axios.put(`/api/users/${passwordResetCode}/reset-password`, {
        newPassword: passwordValue
      })
      setIsSuccess(true)
    } catch (error) {
      setIsFail(true)
    }
  }

  if (isFail) {
    return <PasswordResetFail />
  }

  if (isSuccess) {
    return <PasswordResetSuccess />
  }

  return (
    <div className='content-container'>
      <h1>Reset Password</h1>
      <p>Please enter a new password</p>

      <input
        type='password'
        value={passwordValue}
        onChange={(event) => setPasswordValue(event.target.value)}
        placeholder='Password'
      />

      <input
        type='password'
        value={confirmPasswordValue}
        onChange={(event) => setConfirmPasswordValue(event.target.value)}
        placeholder='Confirm Password'
      />

      <button
        disabled={!passwordValue || !confirmPasswordValue || passwordValue !== confirmPasswordValue}
        onClick={onResetClicked}
      >
        Reset Password
      </button>
    </div>
  )
}
