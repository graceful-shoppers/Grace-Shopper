const router = require('express').Router()
const stripe = require('stripe')('sk_test_gpMBV53Rxvu2RkZQfLLRNNSE004rlxLEsb')
const pick = require('lodash.pick')
const {Order, ProductOrder, Product} = require('../db/models')

router.get('/', (req, res, next) => {
  res.send({
    message: 'Hello Stripe checkout server',
    timestamp: new Date().toISOString
  })
})

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.cart.dataValues.id
      }
    })
    const productOrders = await ProductOrder.findAll({
      where: {
        orderId: req.cart.dataValues.id
      }
    })
    //check if the price calculated by the database values matches the price the front end says we are charging
    const total = productOrders.reduce((totalPrice, currentProduct) => {
      const productTotal =
        currentProduct.dataValues.price * currentProduct.dataValues.quantity
      return totalPrice + productTotal
    }, 0)
    if (total !== req.body.amount) {
      const paymentError = new Error('There was a problem with your order')
      throw paymentError
    }
    //create and send the charge
    const chargePayload = pick(req.body, ['source', 'currency', 'amount'])
    await stripe.charges.create(chargePayload)

    //manage all the database stuff
    await order.update({
      status: 'Processing',
      subtotal: total
    })

    if (req.cart.dataValues.userId) {
      await Order.create({
        userId: req.cart.dataValues.userId,
        status: 'Created'
      })
    } else {
      await Order.create({
        sid: req.cart.dataValues.sid,
        status: 'Created'
      })
    }

    productOrders.forEach(async productOrder => {
      const product = await Product.findOne({
        where: {
          id: productOrder.dataValues.productId
        }
      })
      console.log('updating quantity for a product :')
      const previousQuantity = product.quantity
      await product.update({
        quantity: previousQuantity - productOrder.dataValues.quantity
      })
    })

    //send confirmation email
    const emailAddress = req.body.email

    const send = require('gmail-send')({
      user: 'graceshoveler@gmail.com',
      pass: '@shovels',
      to: emailAddress,
      subject: 'Your Graceful Shoveler Order'
    })
    send(
      {
        text: 'Your order is being processed and will ship soon!'
      },
      (error, result, fullResult) => {
        if (error) console.error(error)
        console.log(result)
      }
    )
    //if we made it through the entire process send the result back to the front end
    await res.status(200).send()
  } catch (err) {
    res.status(500).send({error: err})
    console.log(err)
  }
})

//key pk_test_DY5MZUNFD7FjEQYwYhz4sK9h00CNymDRBp
module.exports = router
