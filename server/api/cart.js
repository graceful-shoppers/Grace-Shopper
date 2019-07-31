const router = require('express').Router()
const {Order, ProductOrder, Product} = require('../db/models')

// router.get('/', async (req, res, next) => {
//   try {
//     const shovels = await Product.findAll()
//     res.json(shovels)
//   } catch (err) {
//     next(err)
//   }
// })

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
        }
      })
    }

    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/')

module.exports = router
