const Order = require("../models/Order");

exports.makeAnOrder = async (userData) => {
  const order = await Order.create(userData);

  return order;
};

exports.getOrders = async () => {
  const order = await Order.find();

  return order;
};

exports.changeProductDeliveryStatus = async (id, status) => {
  const product = await Order.findByIdAndUpdate(
    id,
    { status },
  );

  return product;
};


exports.deleteProduct = async (id) => {
  await Order.findByIdAndDelete(id)
}