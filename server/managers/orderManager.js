const Order = require('../models/Order')

exports.makeAnOrder = async (userData) => {
    const order = await Order.create(userData)

    return order
}