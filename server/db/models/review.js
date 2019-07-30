const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  text: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INTEGER
  }
})

Review.beforeValidate(review => {
  if (!review.userId || !review.productId) {
    const err = new Error('a userId and productId are required')
    throw err
  } else if (review.text.length < 5) {
    const err = new Error('that review is too short')
    throw err
  }
})

module.exports = Review
