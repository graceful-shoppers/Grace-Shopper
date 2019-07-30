const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  category: {
    type: Sequelize.ENUM('yardShovel', 'kitchenShovel', 'mouthShovel')
  },
  imageUrl: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    },
    defaultValue:
      'https://gloimg.gbtcdn.com/soa/gb/pdm-provider-img/straight-product-img/20180423/T019096/T0190960279/goods_img_big-v1/130754-5523.jpg'
  }
})

module.exports = Product
