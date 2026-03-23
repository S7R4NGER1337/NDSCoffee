require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')

const productController = require('./controlers/productController')
const orderController = require('./controlers/orderController')
const adminController = require('./controlers/adminController')

const app = express()

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000').split(',')
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ limit: '20mb', extended: true }))

// Rate limiting on login to prevent brute force
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/login', loginLimiter)

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/EcommerseForPortfolio'
mongoose.connect(mongoUri)
  .then(() => console.log('Database connected'))
  .catch(err => {
    console.error('Database connection error:', err)
    process.exit(1)
  })

app.use('/products', productController)
app.use('/products', orderController)
app.use(adminController)

const PORT = process.env.PORT || 3030
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
