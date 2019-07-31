const router = require('express').Router()
const {Order, ProductOrder, Product} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    var cart = await Order.findOne({
      where: {
        userId: req.params.id
      },
      include: [{all: true}]
    })

    if (!cart) {
      cart = await Order.findOne({
        where: {
          sid: req.params.id
        },
        include: [{all: true}]
      })
    }

    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId/:orderId', async (req, res, next) => {
  try {
    const productOrder = await ProductOrder.destroy({
      where: {
        productId: req.params.productId,
        orderId: req.params.orderId
      }
    })

    res.json(productOrder)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/')

module.exports = router
