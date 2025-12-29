import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { 
  FiShoppingBag, 
  FiPackage, 
  FiUsers, 
  FiMenu, 
  FiX,
  FiLogOut
} from 'react-icons/fi'
import { useAuth } from '@/hooks/useAuth'

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('items')
  const router = useRouter()
  const { logout } = useAuth()

  const menuItems = [
    { id: 'items', label: 'Items', icon: <FiShoppingBag /> },
    { id: 'checkouts', label: 'Checkouts', icon: <FiPackage /> },
    { id: 'users', label: 'Users', icon: <FiUsers /> },
  ]

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-40"
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            
            <div className="text-lg font-semibold">
              {menuItems.find(item => item.id === activeTab)?.label}
            </div>
            
            <div className="w-10"></div> {/* Spacer for symmetry */}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Conditional Rendering based on activeTab */}
          {activeTab === 'items' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Items</h2>
              {/* Items management component will be imported and rendered here */}
              {children}
            </div>
          )}
          
          {activeTab === 'checkouts' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Checkout Requests</h2>
              {/* Checkouts management will go here */}
              <p className="text-gray-500">Checkout requests will appear here</p>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
              {/* Users management will go here */}
              <p className="text-gray-500">User management interface will appear here</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
