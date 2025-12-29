import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { FiPackage, FiUsers, FiShoppingBag, FiTrendingUp } from 'react-icons/fi'
import { useAuth } from '@/hooks/useAuth'
import AdminLayout from '@/components/Admin/AdminLayout'

export default function AdminDashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.email !== 'zaid@gmail.com')) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user || user.email !== 'zaid@gmail.com') {
    return null
  }

  const stats = [
    { label: 'Total Products', value: '24', icon: <FiShoppingBag />, color: 'blue' },
    { label: 'Total Orders', value: '156', icon: <FiPackage />, color: 'green' },
    { label: 'Active Users', value: '89', icon: <FiUsers />, color: 'purple' },
    { label: 'Revenue', value: '$12,458', icon: <FiTrendingUp />, color: 'orange' },
  ]

  return (
    <AdminLayout activeTab="dashboard">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Admin!</h1>
        <p className="text-gray-600">Here's what's happening with your store today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/admin/items')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
          >
            <FiShoppingBag className="inline-block text-2xl text-blue-600 mb-2" />
            <p className="font-medium">Add New Product</p>
          </button>
          
          <button
            onClick={() => router.push('/admin/checkouts')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center"
          >
            <FiPackage className="inline-block text-2xl text-green-600 mb-2" />
            <p className="font-medium">View Orders</p>
          </button>
          
          <button
            onClick={() => router.push('/admin/users')}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center"
          >
            <FiUsers className="inline-block text-2xl text-purple-600 mb-2" />
            <p className="font-medium">Manage Users</p>
          </button>
        </div>
      </motion.div>
    </AdminLayout>
  )
}
