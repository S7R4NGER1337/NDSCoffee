const Order = require('../models/Order')

exports.makeAnOrder = async (userData) => {
    const order = await Order.create(userData)

    return order
}

exports.getOrders = async () => {
    const order = await Order.find()

    return order
}