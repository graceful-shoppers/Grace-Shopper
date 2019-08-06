const router = require('express').Router()
const {Product, User, Order} = require('../db/models')

const adminCheck = (req, res, next) => {
  if (!req.user.dataValues.isAdmin) {
    console.log('here')
    const error = new Error()
    error.message = 'ACCESS NOT ALLOWED'
    // error.status = 401
    res.redirect(401, 'back')
    console.log('redirected')
    next(error)
  } else {
    next()
  }
}

router.get('/orders/:type', adminCheck, async (req, res, next) => {
  try {
    console.log('accessed')
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

router.put('/editShovel/:id', adminCheck, async (req, res, next) => {
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

router.put('/allUsers/:id', adminCheck, async (req, res, next) => {
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

router.put('/allOrders/:id', adminCheck, async (req, res, next) => {
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

router.delete('/shovels/:id', adminCheck, async (req, res, next) => {
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

router.delete('/allUsers/:id', adminCheck, async (req, res, next) => {
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
