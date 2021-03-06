import { useState, useEffect } from 'react'

import { useToken } from './useToken'

export const useUser = () => {
  // we don't need setToken here
  const [token] = useToken()

  const getPayloadFromToken = (token) => {
    const encodedPayload = token.split('.')[1]
    return JSON.parse(atob(encodedPayload))
  }

  const [user, setUser] = useState(() => {
    if (!token) {
      return null
    } else {
      return getPayloadFromToken(token)
    }
  })

  useEffect(() => {
    if (!token) {
      setUser(null)
    } else {
      setUser(getPayloadFromToken(token))
    }
  }, [token])

  return user
}
