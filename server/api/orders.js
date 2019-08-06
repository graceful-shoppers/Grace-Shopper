const router = require('express').Router()
const {Order} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

module.exports = router
