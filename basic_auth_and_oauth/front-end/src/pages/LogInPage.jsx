import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import { useToken } from '../auth/useToken'

import { useQueryParams } from '../util/useQueryParams'

export const LogInPage = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [googleOauthUrl, setGoogleOauthUrl] = useState('')

  const [_, setToken] = useToken()

  const history = useHistory()

  const { token: oauthToken } = useQueryParams()

  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken)
      history.push('/')
    }
  }, [oauthToken, setToken, history])

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get('/auth/google/url')
        const { url } = await response.data
        setGoogleOauthUrl(url)
      } catch (error) {
        console.error(error)
      }
    }

    loadOauthUrl()
  }, [])

  const onLogInClicked = async () => {
    setErrorMessage('')

    try {
      const response = await axios.post('/api/login', {
        email: emailValue,
        password: passwordValue
      })
      const { token } = response.data
      setToken(token)
      history.push('/')
    } catch (error) {
      // error message can be customized based on error.response.status property
      setErrorMessage(error.message)
    }
  }

  return (
    <div className='content-container'>
      <h1>Log In</h1>

      {errorMessage && <div className='fail'>{errorMessage}</div>}

      <input
        type='text'
        placeholder='someone@gmail.com'
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />

      <hr />

      <button onClick={onLogInClicked} disabled={!emailValue || !passwordValue}>
        Log In
      </button>
      <button onClick={() => history.push('/forgot-password')}>Forgot your password?</button>
      <button onClick={() => history.push('/signup')}>Don't have an account? Sign Up</button>

      <button disabled={!googleOauthUrl} onClick={() => (window.location.href = googleOauthUrl)}>
        Log In with Google
      </button>
    </div>
  )
}
