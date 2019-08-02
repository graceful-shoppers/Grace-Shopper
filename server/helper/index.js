const {Order} = require('../db/models')

const findSessionCart = async reqSid => {
  const order = await Order.findOne({
    where: {
      sid: reqSid,
      status: 'Created'
    }
  })
  return order
}

module.exports = {
  findSessionCart
}
