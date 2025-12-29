import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { 
  FiShoppingBag, 
  FiPackage, 
  FiUsers, 
  FiMenu, 
  FiX,
  FiLogOut,
  FiHome
} from 'react-icons/fi'
import { useAuth } from '@/hooks/useAuth'

const AdminLayout = ({ children, activeTab = 'dashboard' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const router = useRouter()
  const { logout } = useAuth()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome />, path: '/admin' },
    { id: 'items', label: 'Items', icon: <FiShoppingBag />, path: '/admin/items' },
    { id: 'checkouts', label: 'Checkouts', icon: <FiPackage />, path: '/admin/checkouts' },
    { id: 'users', label: 'Users', icon: <FiUsers />, path: '/admin/users' },
  ]

  const handleNavigation = (path) => {
    router.push(path)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: 0 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed lg:relative w-64 h-full bg-white shadow-lg z-40"
      >
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your store</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
          >
            <FiLogOut />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {menuItems.find(item => item.id === activeTab)?.label || 'Admin'}
              </h2>
            </div>
            
            <div className="w-10"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
