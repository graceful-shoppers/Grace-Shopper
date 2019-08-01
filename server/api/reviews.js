const router = require('express').Router()
const {Review} = require('../db/models')

router.get('/:id', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId: req.params.id
      }
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

module.exports = router
