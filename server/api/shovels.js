const router = require('express').Router()
const {Product} = require('../db/models')
const {Op} = require('sequelize')

router.get('/get/:type', async (req, res, next) => {
  try {
    var shovels

    if (req.params.type === 'all') {
      shovels = await Product.findAll()
    } else {
      shovels = await Product.findAll({
        where: {
          category: {[Op.contains]: [req.params.type]}
        }
      })
    }

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
