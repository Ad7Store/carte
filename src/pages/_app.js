import { CartProvider } from '@/contexts/CartContext'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  )
}
