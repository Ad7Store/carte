import axios from 'axios'

export const uploadToCloudinary = async (base64Image) => {
  try {
    const response = await axios.post('/api/cloudinary', {
      image: base64Image
    })
    
    if (response.data.success) {
      return response.data.url
    }
    throw new Error('Upload failed')
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw error
  }
}

export const extractBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
