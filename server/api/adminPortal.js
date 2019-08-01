const router = require('express').Router()
const {Product} = require('../db/models')

router.put('/editShovel/:id', async (req, res, next) => {
  try {
    const shovel = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    shovel.updated(req.body)
    res.json(shovel)
  } catch (err) {
    next(err)
  }
})

router.delete('/editShovel/:id', (req, res, next) => {
  try {
    Product.destroy({
      where: {
        id: req.params.id
      }
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
