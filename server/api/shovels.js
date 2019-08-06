const router = require('express').Router()
const {Product, Review} = require('../db/models')
const {Op} = require('sequelize')

router.get('/get/:title/:type/:sort/:offset', async (req, res, next) => {
  try {
    var shovels

    console.log('type is', req.params.type)

    //default search
    if (
      req.params.title === 'all' &&
      req.params.type === 'all' &&
      req.params.sort !== 'ASC' &&
      req.params.sort !== 'DESC'
    ) {
      shovels = await Product.findAll({
        include: [{all: true}],
        offset: req.params.offset,
        limit: 25
      })
      //all categories, no sorting
    } else if (
      req.params.title === 'all' &&
      req.params.type === 'all' &&
      (req.params.sort === 'ASC' || req.params.sort === 'DESC')
    ) {
      shovels = await Product.findAll({
        include: [{all: true}],
        order: [['price', req.params.sort.toString()]],
        offset: req.params.offset,
        limit: 25
      })
      //specific category, no sorting
    } else if (
      req.params.title === 'all' &&
      req.params.type !== 'all' &&
      (req.params.sort !== 'ASC' && req.params.sort !== 'DESC')
    ) {
      console.log('here')
      shovels = await Product.findAll({
        where: {
          category: {
            [Op.iLike]: `%${req.params.type}%`
          }
        },
        include: [{all: true}],
        offset: req.params.offset,
        limit: 25
      })
      //specific category and sorting
    } else if (
      req.params.title === 'all' &&
      req.params.type !== 'all' &&
      (req.params.sort === 'ASC' || req.params.sort === 'DESC')
    ) {
      shovels = await Product.findAll({
        where: {
          category: {
            [Op.iLike]: `%${req.params.type}%`
          }
        },
        order: [['price', req.params.sort.toString()]],
        include: [{all: true}],
        offset: req.params.offset,
        limit: 25
      })
    } else if (
      req.params.title !== 'all' &&
      req.params.type === 'all' &&
      (req.params.sort !== 'ASC' && req.params.sort !== 'DESC')
    ) {
      shovels = await Product.findAll({
        where: {
          title: {
            [Op.iLike]: `%${req.params.title}%`
          }
        },
        include: [{all: true}],
        offset: req.params.offset,
        limit: 25
      })
    } else if (
      req.params.title !== 'all' &&
      req.params.type !== 'all' &&
      (req.params.sort !== 'ASC' && req.params.sort !== 'DESC')
    ) {
      shovels = await Product.findAll({
        where: {
          title: {
            [Op.iLike]: `%${req.params.title}%`
          },
          category: {
            [Op.iLike]: `%${req.params.type}%`
          }
        },
        include: [{all: true}],
        offset: req.params.offset,
        limit: 25
      })
    } else if (
      req.params.title !== 'all' &&
      req.params.type === 'all' &&
      (req.params.sort === 'ASC' || req.params.sort === 'DESC')
    ) {
      shovels = await Product.findAll({
        where: {
          title: {
            [Op.iLike]: `%${req.params.title}%`
          }
        },
        order: [['price', req.params.sort.toString()]],
        include: [{all: true}],
        offset: req.params.offset,
        limit: 25
      })
    } else if (
      req.params.title !== 'all' &&
      req.params.type !== 'all' &&
      (req.params.sort === 'ASC' || req.params.sort === 'DESC')
    ) {
      shovels = await Product.findAll({
        where: {
          title: {
            [Op.iLike]: `%${req.params.title}%`
          },
          category: {
            [Op.iLike]: `%${req.params.type}%`
          }
        },
        order: [['price', req.params.sort.toString()]],
        include: [{all: true}],
        offset: req.params.offset,
        limit: 25
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
