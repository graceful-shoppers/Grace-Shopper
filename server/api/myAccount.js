const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/orders', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
