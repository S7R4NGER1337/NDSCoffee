const Product = require('../models/Product')

exports.getAllProducts = async () => {
  return Product.find().lean()
}

exports.getProductsPrice = async (id) => {
  const product = await Product.findById(id).select('price').lean()
  return product ? product.price : 0
}

exports.getCartProductById = async (id) => {
  return Product.findById(id).lean()
}

exports.createProduct = async (productData) => {
  return Product.create(productData)
}

exports.changeProductStatus = async (id) => {
  return Product.findOneAndUpdate(
    { _id: id },
    [{ $set: { isActive: { $not: '$isActive' } } }],
    { new: true }
  )
}

exports.getProductById = async (id) => {
  return Product.findById(id).lean()
}

exports.deleteProduct = async (id) => {
  return Product.findByIdAndDelete(id)
}

exports.updateProduct = async (id, data) => {
  return Product.findByIdAndUpdate(id, data, { new: true })
}

exports.getAvailable = async () => {
  return Product.find({ isActive: true })
    .select('name price _id image description roastLevel origin')
    .lean()
}

exports.getThreeProducts = async () => {
  return Product.find({ isActive: true }).limit(3).lean()
}
