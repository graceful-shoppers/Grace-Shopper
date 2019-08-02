const {Order} = require('../db/models')

const findSessionCart = async reqSid => {
  const order = await Order.findOne({
    where: {
      sid: reqSid,
      status: 'Created'
    },
    include: [{all: true}]
  })
  return order
}

const cancelCart = async reqSid => {
  try {
    const orderToCancel = await findSessionCart(reqSid)
    await orderToCancel.update({
      status: 'Cancelled'
    })
  } catch (err) {
    console.error(err, 'something wrong in the cancel cart')
  }
}

module.exports = {
  findSessionCart,
  cancelCart
}
