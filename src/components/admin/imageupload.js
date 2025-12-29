import { useState, useRef } from 'react'
import { FiUpload, FiX } from 'react-icons/fi'
import { uploadToCloudinary, extractBase64 } from '@/utils/cloudinary'
import toast from 'react-hot-toast'

const ImageUpload = ({ onUpload, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || '')
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    
    try {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)

      // Upload to Cloudinary
      const base64 = await extractBase64(file)
      const imageUrl = await uploadToCloudinary(base64)
      
      setPreview(imageUrl)
      onUpload(imageUrl)
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error('Failed to upload image')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview('')
    onUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition"
        >
          <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
          <p className="text-gray-600">Click to upload image</p>
          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />

      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Select Image'}
        </button>
        
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}

export default ImageUpload
