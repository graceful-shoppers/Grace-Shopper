const {Order} = require('../db/models')

const findSessionCart = async reqSid => {
  try {
    const order = await Order.findOne({
      where: {
        sid: reqSid,
        status: 'Created'
      },
      include: [{all: true}]
    })
    return order
  } catch (err) {
    console.error('error in findsessioncart in helper/index.js', err)
  }
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
