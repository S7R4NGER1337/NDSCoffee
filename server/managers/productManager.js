const Product = require('../models/Product')

exports.getAllProducts = async () => {
    const products = await Product.find()
    return products
}

exports.createProduct = async (productData) => {
    console.log(productData);
    try {
        
        await Product.create(productData)
    } catch (error) {
        console.log(error);
        
    }
}

exports.getProductById = async (id) => {
    try {
        const product = await Product.findById(id)
        return product
    } catch (error) {
        console.log(error);
    }
}

exports.deleteProduct = async (id) => {
    const deletedProduct = await Product.findByIdAndDelete(id)

    return deletedProduct
}

exports.updateProduct = async (id, data) => {
    const product = await Product.findByIdAndUpdate(id, data)

    return product
}