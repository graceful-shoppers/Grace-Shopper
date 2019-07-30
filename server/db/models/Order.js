const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
  },
  sessionId: {
    type: Sequelize.INTEGER
  },
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
