const Product = require("../models/Product");

exports.getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

exports.getProductsPrice = async (id) => {
  const product = await Product.findById(id).select("price").lean()
  
  return product.price
}

exports.getCartProductById = async (id) => {
  const product = await Product.findById(id)
  
  return product
}

exports.createProduct = async (productData) => {
  try {
    await Product.create(productData);
  } catch (error) {
    console.log(error);
  }
};

exports.changeProductStatus = async (id) => {
  const product = await Product.findOneAndUpdate(
    { _id: id },
    [{ $set: { isActive: { $not: "$isActive" } } }],
    { new: true }
  );

  return product;
};

exports.getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (id) => {
  const deletedProduct = await Product.findByIdAndDelete(id);

  return deletedProduct;
};

exports.updateProduct = async (id, data) => {
  const product = await Product.findByIdAndUpdate(id, data);

  return product;
};

exports.getAvailable = async () => {
  const availableProducts = await Product.find({ isActive: true }).select('name price _id image description roastLevel');

  return availableProducts;
};

exports.getThreeProducts = async () => {
  const threeProducts = await Product.find({ isActive: true }).limit(3);

  return threeProducts;
};
