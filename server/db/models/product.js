const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true
    }
  },
  category: {
    type: Sequelize.ENUM(
      'yardShovel',
      'kitchenShovel',
      'mouthShovel',
      'snowShovel'
    )
  },
  availability: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  imageUrl: {
    type: Sequelize.STRING
    //   validate: {
    //     isUrl: true
    //   },
    //   defaultValue:
    //     'https://gloimg.gbtcdn.com/soa/gb/pdm-provider-img/straight-product-img/20180423/T019096/T0190960279/goods_img_big-v1/130754-5523.jpg'
    // }
  }
})

module.exports = Product
