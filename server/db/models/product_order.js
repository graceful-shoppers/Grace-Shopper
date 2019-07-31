const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('product_Order', {
  price: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = ProductOrder
