const Order = require('../models/Order')

exports.makeAnOrder = async (userData) => {
  return Order.create(userData)
}

exports.getOrders = async () => {
  return Order.find().lean()
}

exports.changeOrderStatus = async (id, status) => {
  return Order.findByIdAndUpdate(id, { status }, { new: true })
}

exports.deleteOrder = async (id) => {
  return Order.findByIdAndDelete(id)
}
