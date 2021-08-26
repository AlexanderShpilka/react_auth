import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const PleaseVerifyEmailPage = () => {
  const history = useHistory()

  useEffect(() => {
    const timerId = setTimeout(() => {
      history.push('/')
    }, 5000)

    return () => clearTimeout(timerId)
  }, [history])

  return (
    <div className='content-container'>
      <h1>Thanks for Signing Up!</h1>
      <p>
        A verification email has been sent to the email address you provided. Please verify your
        email to unlock full site features.
      </p>
    </div>
  )
}
