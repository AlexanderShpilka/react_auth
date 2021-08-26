import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { EmailVerificationSuccess } from './EmailVerificationSuccess'
import { EmailVerificationFail } from './EmailVerificationFail'

import { useToken } from '../auth/useToken'

export const EmailVerificationLandingPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  const { verificationString } = useParams()

  const [_, setToken] = useToken()

  useEffect(() => {
    const loadVerification = async () => {
      try {
        const response = await axios.put('/api/verify-email', { verificationString })
        const { token } = response.data
        setToken(token)
        setIsSuccess(true)
      } catch (error) {
        setIsSuccess(false)
      } finally {
        setIsLoading(false)
      }
    }

    loadVerification()
  }, [setToken, verificationString])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!isSuccess) {
    return <EmailVerificationFail />
  }

  return <EmailVerificationSuccess />
}
