const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
  },
//removed sessionId as it is now added as 'sid' via association with session table
  subtotal: {
    type: Sequelize.INTEGER
  }
})

Order.beforeValidate(order => {
  if (!order.sessionId && !order.userId) {
    const err = new Error('a sessionId or userId is required')
    throw err
  }
})

module.exports = Order
