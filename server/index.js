const express = require('express')
const cors =  require('cors')
const mongoose = require('mongoose')

const productController = require('./controlers/productController')
const orderController = require('./controlers/orderController')
const adminController = require('./controlers/adminController')

const app = express()
app.use(cors())

app.use(express.urlencoded())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/EcommerseForPortfolio')
    .then(() => console.log('Db connected'))
    .catch(error => console.log(error))

app.use('/products',productController)
app.use('/products', orderController)
app.use(adminController)

app.listen(3030, () => console.log('test'))

