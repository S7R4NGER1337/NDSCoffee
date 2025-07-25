const router = require('express').Router()
const orderManager = require('../managers/orderManager')

router.post('/order/:id', async (req, res) => {
    const order = orderManager.makeAnOrder(req.body)
    
    res.json(order)
    res.end()
})

module.exports = router
