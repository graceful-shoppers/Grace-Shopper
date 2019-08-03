const router = require('express').Router()
const {Product, Review} = require('../db/models')
const {Op} = require('sequelize')

router.get('/get/:type/:sort', async (req, res, next) => {
  try {
    var shovels

    if (
      req.params.type === 'all' &&
      req.params.sort !== 'ASC' &&
      req.params.sort !== 'DESC'
    ) {
      shovels = await Product.findAll({
        include: [{all: true}]
      })
    } else if (
      req.params.type === 'all' &&
      (req.params.sort === 'ASC' || req.params.sort === 'DESC')
    ) {
      shovels = await Product.findAll({
        include: [{all: true}],
        order: [['price', req.params.sort.toString()]]
      })
    } else if (
      req.params.type !== 'all' &&
      (req.params.sort !== 'ASC' && req.params.sort !== 'DESC')
    ) {
      shovels = await Product.findAll({
        where: {
          category: {[Op.contains]: [req.params.type]}
        },
        include: [{all: true}]
      })
    } else {
      shovels = await Product.findAll({
        where: {
          category: {[Op.contains]: [req.params.type]}
        },
        order: [['price', req.params.sort.toString()]],
        include: [{all: true}]
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
