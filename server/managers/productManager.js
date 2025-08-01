const Product = require("../models/Product");

exports.getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

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
  const availableProducts = await Product.find({ isActive: true });

  return availableProducts;
};

exports.getThreeProducts = async () => {
  const threeProducts = await Product.find({ isActive: true }).limit(3);

  return threeProducts;
};
