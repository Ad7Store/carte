import { motion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import Image from 'next/image'
import { FiShoppingCart } from 'react-icons/fi'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover hover:scale-110 transition-transform duration-300"
        />
        {product.offPrice && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
            {Math.round(((product.price - product.offPrice) / product.price) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-blue-600">
              ${product.offPrice || product.price}
            </span>
            {product.offPrice && (
              <span className="text-gray-400 line-through">${product.price}</span>
            )}
          </div>
        </div>

        {/* Buy Now Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2 hover:opacity-90 transition"
        >
          <FiShoppingCart />
          <span>Buy Now</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ProductCard
