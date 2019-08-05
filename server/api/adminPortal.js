const router = require('express').Router()
const {Product, User, Order} = require('../db/models')

router.get('/orders/:type', async (req, res, next) => {
  console.log(req.params.type)
  try {
    if (req.params.type === 'all') {
      const orders = await Order.findAll({
        include: [{model: User}]
      })
      res.json(orders)
    } else {
      const orders = await Order.findAll({
        where: {status: req.params.type},
        include: [{model: User}]
      })
      res.json(orders)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/editShovel/:id', async (req, res, next) => {
  try {
    const shovel = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    shovel.update(req.body)
    res.json(shovel)
  } catch (err) {
    next(err)
  }
})

router.put('/allUsers/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    user.update(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/allOrders/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id
      }
    })
    order.update(req.body)
    res.json(order)
  } catch (err) {
    console.error(err)
  }
})

router.delete('/shovels/:id', async (req, res, next) => {
  try {
    const test = await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(test)
  } catch (err) {
    next(err)
  }
})

router.delete('/allUsers/:id', async (req, res, next) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(deleteUser)
  } catch (err) {
    next(err)
  }
})

module.exports = router
