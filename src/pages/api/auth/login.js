import { setCookie } from 'cookies-next'
import jwt from 'jsonwebtoken'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  // Check for admin credentials
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: '7d' }
    )

    setCookie('auth-token', token, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })

    return res.status(200).json({ 
      success: true, 
      user: { email, role: 'admin' },
      redirect: '/admin'
    })
  }

  // Regular user login (you can add your user database logic here)
  // For now, we'll create a demo user
  const token = jwt.sign(
    { email, role: 'user' },
    process.env.NEXTAUTH_SECRET,
    { expiresIn: '7d' }
  )

  setCookie('auth-token', token, {
    req,
    res,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  })

  return res.status(200).json({ 
    success: true, 
    user: { email, role: 'user' },
    redirect: '/'
  })
}
