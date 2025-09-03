const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    origin: String,
    roastLevel: String,
    bought: Number,
    isActive: Boolean,
    qty: Number,
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product