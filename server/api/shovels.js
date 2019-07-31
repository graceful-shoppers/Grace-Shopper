const router = require('express').Router()
const {Product} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const shovels = await Product.findAll()
    res.json(shovels)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const shovel = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(shovel)
  } catch (err) {
    next(err)
  }
})

module.exports = router
