const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    productId: Array
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order