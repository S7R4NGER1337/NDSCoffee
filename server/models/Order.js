const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    fullName: String,
    streetAddres: String,
    city: String,
    postalCode: String,
    phone: String,
    paymentType: String,
    cart: Array,
    status: String
})

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order