const router = require('express').Router()
const orderManager = require('../managers/orderManager')

router.get('/order/:id', async (req, res) => {
    const productId = req.params.id
    const userData = {
        name: 'Koleto',
        address: "Plovdiv",
        phone: '0293920932'
    }

    const order = orderManager.makeAnOrder(userData, productId)
    
    res.json(order)
    res.end()
})

module.exports = router
