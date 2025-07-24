const router = require('express').Router()
const productManager = require('../managers/productManager')

router.get('/', async (req, res) => { 
    const products = await productManager.getAllProducts()

    res.json(products)
    res.end()
})

router.post('/create', (req, res) => {
    try {
        productManager.createProduct(req.body)
    } catch (error) {
        console.log(error);
    }
    res.end()
})

router.get('/available', async (req, res) => {
    const products = await productManager.getAvailable()
    
    res.json(products)
    
    res.end()    
})
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const product = await productManager.getProductById(id)

    if(!product) throw new Error('This product doesnt exist')

    if(!product){
        console.log('Error');
        return
    }

    res.json(product)
    res.end()
})

router.post('/:id', async (req, res) => {
    const {id} = req.params

   await productManager.deleteProduct(id)

    res.end()
})

router.put('/:id', async (req, res) => {
    const data = req.body
    const id = req.params.id

    const updatedProduct = await productManager.updateProduct(id, data)

    res.json(updatedProduct)
    res.end()
})
module.exports = router