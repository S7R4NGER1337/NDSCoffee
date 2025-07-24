const Order = require('../models/Order')

exports.makeAnOrder = async (userData, productId) => {
    const {name, address, phone} = userData
    const order = await Order.create({name, address, phone, productId})

    return order
}