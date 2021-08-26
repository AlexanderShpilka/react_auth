import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

export const ForgotPasswordPage = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [emailValue, setEmailValue] = useState('')

  const history = useHistory()

  const onSubmitClicked = async () => {
    try {
      const response = await axios.put(`/api/forgot-password/${emailValue}`)
      setIsSuccess(true)
      setTimeout(() => {
        history.push(`/reset-password?email=${encodeURIComponent(emailValue)}`)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return isSuccess ? (
    <div className='content-container'>
      <h1>Success</h1>
      <p>Check your email for a reset link</p>
    </div>
  ) : (
    <div className='content-container'>
      <h1>Forgot password</h1>
      <p>Enter your email and we'll send you a reset link.</p>
      {errorMessage && <div className='fail'>{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={(event) => setEmailValue(event.target.value)}
        placeholder='someone@gmail.com'
      />
      <button disabled={!emailValue} onClick={onSubmitClicked}>
        Send Reset Link
      </button>
    </div>
  )
}
