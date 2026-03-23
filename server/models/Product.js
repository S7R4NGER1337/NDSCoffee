const mongoose = require('mongoose')

const ROAST_LEVELS = ['Light', 'Medium', 'MediumDark', 'Dark']

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  origin: { type: String, required: true, trim: true },
  roastLevel: { type: String, required: true, enum: ROAST_LEVELS },
  bought: { type: Number, default: 0, min: 0 },
  isActive: { type: Boolean, default: false },
  qty: { type: Number, required: true, min: 0 },
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
