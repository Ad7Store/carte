import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi'
import toast from 'react-hot-toast'
import ImageUpload from './ImageUpload'

const ItemsManagement = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    offPrice: '',
    description: '',
    image: ''
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/items')
      setItems(response.data)
    } catch (error) {
      toast.error('Error fetching items')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingItem) {
        await axios.put('/api/items', { id: editingItem.id, ...formData })
        toast.success('Item updated successfully')
      } else {
        await axios.post('/api/items', formData)
        toast.success('Item added successfully')
      }
      setEditingItem(null)
      setFormData({ name: '', price: '', offPrice: '', description: '', image: '' })
      fetchItems()
    } catch (error) {
      toast.error('Error saving item')
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      price: item.price,
      offPrice: item.offPrice || '',
      description: item.description,
      image: item.image
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/items?id=${id}`)
        toast.success('Item deleted successfully')
        fetchItems()
      } catch (error) {
        toast.error('Error deleting item')
      }
    }
  }

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, image: imageUrl }))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Items</h2>
        <button
          onClick={() => {
            setEditingItem(null)
            setFormData({ name: '', price: '', offPrice: '', description: '', image: '' })
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <FiPlus />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg mb-6"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Item Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Off Price ($) - Optional</label>
              <input
                type="number"
                step="0.01"
                value={formData.offPrice}
                onChange={(e) => setFormData({ ...formData, offPrice: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image Upload</label>
              <ImageUpload onUpload={handleImageUpload} currentImage={formData.image} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              rows="3"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      </motion.div>

      {/* Items List */}
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm my-2">{item.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-blue-600">
                      ${item.offPrice || item.price}
                    </span>
                    {item.offPrice && (
                      <span className="text-gray-400 line-through">${item.price}</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <FiEdit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
                  >
                    <FiTrash2 />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ItemsManagement
