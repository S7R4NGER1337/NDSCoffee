const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number,
    bought: Number,
    isActive: Boolean,
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product