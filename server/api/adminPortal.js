const router = require('express').Router()
const {Product, User} = require('../db/models')

router.put('/editShovel/:id', async (req, res, next) => {
  console.log('words')
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

router.delete('/allUsers', async (req, res, next) => {
  try {
    const test = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(test)
  } catch (err) {
    next(err)
  }
})

module.exports = router
