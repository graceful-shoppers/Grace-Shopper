const router = require('express').Router()
const {Order, ProductOrder, Product} = require('../db/models')

router.put('/', async (req, res, next) => {
  try {
    var productOrder = await ProductOrder.findOne({
      where: {
        productId: req.body.productId,
        orderId: req.cart.id
      }
    })

    var product = await Product.findOne({
      where: {
        id: req.body.productId
      }
    })

    await productOrder.update({
      quantity: req.body.quantity
    })

    res.json({productOrder, product})
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const order = req.cart
    var newProductOrder
    newProductOrder = await ProductOrder.findOne({
      where: {
        productId: req.body.productId,
        orderId: order.id
      }
    })

    if (newProductOrder) {
      let newQuantity = 0
      newQuantity = newProductOrder.quantity + req.body.quantity

      await newProductOrder.update({
        quantity: newQuantity
      })
    } else {
      newProductOrder = await ProductOrder.create({
        productId: req.body.productId,
        quantity: req.body.quantity,
        price: req.body.price,
        orderId: order.id
      })
    }

    const product = await Product.findOne({
      where: {
        id: req.body.productId
      }
    })

    res.json({newProductOrder, product})
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    res.json(req.cart)
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
