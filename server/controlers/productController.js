const router = require('express').Router()
const productManager = require('../managers/productManager')
const { requireAuth } = require('../middleware/auth')

// ─── Public routes ────────────────────────────────────────────────────────────

router.get('/available', async (req, res) => {
  try {
    const products = await productManager.getAvailable()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products.' })
  }
})

router.get('/featured', async (req, res) => {
  try {
    const products = await productManager.getThreeProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch featured products.' })
  }
})

router.post('/price', async (req, res) => {
  try {
    const { ids } = req.body
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids must be a non-empty array.' })
    }
    const prices = await Promise.all(ids.map((id) => productManager.getProductsPrice(id)))
    const sumOfPrices = prices.reduce((sum, price) => sum + (price || 0), 0)
    res.json({ sum: sumOfPrices })
  } catch (error) {
    res.status(500).json({ error: 'Failed to calculate prices.' })
  }
})

router.post('/cartProduct', async (req, res) => {
  try {
    const { ids } = req.body
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'ids must be a non-empty array.' })
    }
    const products = await Promise.all(ids.map((id) => productManager.getCartProductById(id)))
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cart products.' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.id)
    if (!product) return res.status(404).json({ error: 'Product not found.' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product.' })
  }
})

// ─── Admin-only routes (require auth) ────────────────────────────────────────

router.get('/', requireAuth, async (req, res) => {
  try {
    const products = await productManager.getAllProducts()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products.' })
  }
})

router.post('/create', requireAuth, async (req, res) => {
  try {
    const product = await productManager.createProduct(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product.' })
  }
})

router.post('/edit/:id', requireAuth, async (req, res) => {
  try {
    const updated = await productManager.updateProduct(req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Product not found.' })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product.' })
  }
})

router.post('/status/:id', requireAuth, async (req, res) => {
  try {
    const updated = await productManager.changeProductStatus(req.params.id)
    if (!updated) return res.status(404).json({ error: 'Product not found.' })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Failed to change product status.' })
  }
})

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const deleted = await productManager.deleteProduct(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Product not found.' })
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product.' })
  }
})

module.exports = router
