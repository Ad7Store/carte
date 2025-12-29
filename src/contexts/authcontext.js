import { createContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing auth token on mount
    const token = Cookies.get('auth-token')
    if (token) {
      try {
        // Parse JWT token (without verification for client-side)
        const payload = JSON.parse(atob(token.split('.')[1]))
        setUser(payload)
      } catch (error) {
        console.error('Invalid token:', error)
        Cookies.remove('auth-token')
      }
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.user)
        
        // Set cookie with token
        if (data.token) {
          Cookies.set('auth-token', data.token, { expires: 7 })
        }
        
        return { success: true, redirect: data.redirect || '/' }
      } else {
        return { success: false, message: data.message || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'Network error' }
    }
  }, [])

  const logout = useCallback(() => {
    Cookies.remove('auth-token')
    setUser(null)
    router.push('/login')
  }, [router])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }
