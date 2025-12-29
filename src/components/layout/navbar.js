import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiUser, FiSearch, FiLogOut } from 'react-icons/fi'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import Link from 'next/link'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-blue-600"
          >
            <Link href="/">ElectroShop</Link>
          </motion.div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search electronics..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.email === 'zaid@gmail.com' && (
                  <Link
                    href="/admin"
                    className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-gray-100"
              >
                <FiUser />
                <span>Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100"
            >
              <FiShoppingCart className="text-xl" />
              {cart.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cart.length}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
