const router = require('express').Router()
const {Product, User} = require('../db/models')

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
