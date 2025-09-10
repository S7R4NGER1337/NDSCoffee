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

router.post('/changeStatus/:id', async (req, res) => {
    const { status } = req.body
    const id = req.params.id
    const product = await orderManager.changeProductDeliveryStatus(id, status)

    res.send(product)
})

router.get('/deleteOrder/:id', async (req, res) => {
    const id = req.params.id
    await orderManager.deleteProduct(id)
})
module.exports = router
