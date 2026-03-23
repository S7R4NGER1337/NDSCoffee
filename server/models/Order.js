const mongoose = require('mongoose')

const ORDER_STATUSES = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled']

const OrderSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  streetAddress: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  paymentType: { type: String, required: true, enum: ['cash', 'card'] },
  cart: { type: Array, required: true },
  status: { type: String, default: 'Pending', enum: ORDER_STATUSES },
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema)

module.exports = Order
