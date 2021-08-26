import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useQueryParams } from '../util/useQueryParams'

export const PleaseVerifyEmailPage = () => {
  const history = useHistory()

  const { email } = useQueryParams()

  useEffect(() => {
    const timerId = setTimeout(() => {
      history.push(`/verify-email?email=${encodeURIComponent(email)}`)
    }, 5000)

    return () => clearTimeout(timerId)
  }, [history, email])

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
