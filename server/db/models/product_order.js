const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('product_Order', {
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = ProductOrder
