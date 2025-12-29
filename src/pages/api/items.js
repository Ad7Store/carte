import { getGitHubData, updateGitHubData } from '@/utils/github-api'

export default async function handler(req, res) {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        const items = await getGitHubData('data/items.json')
        return res.status(200).json(items)

      case 'POST':
        const newItem = req.body
        const itemsData = await getGitHubData('data/items.json')
        itemsData.push({
          id: Date.now().toString(),
          ...newItem,
          createdAt: new Date().toISOString()
        })
        await updateGitHubData('data/items.json', itemsData)
        return res.status(201).json({ success: true })

      case 'PUT':
        const { id, ...updates } = req.body
        const allItems = await getGitHubData('data/items.json')
        const updatedItems = allItems.map(item => 
          item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
        )
        await updateGitHubData('data/items.json', updatedItems)
        return res.status(200).json({ success: true })

      case 'DELETE':
        const itemId = req.query.id
        const currentItems = await getGitHubData('data/items.json')
        const filteredItems = currentItems.filter(item => item.id !== itemId)
        await updateGitHubData('data/items.json', filteredItems)
        return res.status(200).json({ success: true })

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        return res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
