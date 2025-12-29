import { createContext, useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = () => {
    try {
      const token = Cookies.get('auth-token')
      if (token) {
        const decoded = jwt.decode(token)
        setUser(decoded)
      }
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setUser(data.user)
        return { success: true, redirect: data.redirect }
      }
      
      return { success: false, message: 'Invalid credentials' }
    } catch (error) {
      return { success: false, message: 'Login failed' }
    }
  }

  const logout = () => {
    Cookies.remove('auth-token')
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
