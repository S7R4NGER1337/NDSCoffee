const router = require('express').Router()
const orderManager = require('../managers/orderManager')
const { requireAuth } = require('../middleware/auth')

// ─── Public routes ────────────────────────────────────────────────────────────

router.post('/order', async (req, res) => {
  try {
    const order = await orderManager.makeAnOrder(req.body)
    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order.' })
  }
})

// ─── Admin-only routes ────────────────────────────────────────────────────────

router.get('/orders', requireAuth, async (req, res) => {
  try {
    const orders = await orderManager.getOrders()
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders.' })
  }
})

router.post('/changeStatus/:id', requireAuth, async (req, res) => {
  try {
    const { status } = req.body
    if (!status) return res.status(400).json({ error: 'Status is required.' })
    const updated = await orderManager.changeOrderStatus(req.params.id, status)
    if (!updated) return res.status(404).json({ error: 'Order not found.' })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status.' })
  }
})

router.delete('/order/:id', requireAuth, async (req, res) => {
  try {
    await orderManager.deleteOrder(req.params.id)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order.' })
  }
})

module.exports = router
