const router = require('express').Router()
const orderManager = require('../managers/orderManager')

router.post('/order/:id', async (req, res) => {
    const order = orderManager.makeAnOrder(req.body)
    
    res.json(order)
    res.end()
})


router.get('/order/:id', async (req, res) => {
    const orders = await orderManager.getOrders()
    res.json(orders)
    res.end()
})
module.exports = router
