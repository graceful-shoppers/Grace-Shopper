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

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create({
      text: req.body.text,
      rating: req.body.rating,
      // userId: req.user.dataValues.id,
      productId: req.body.productId
    })
    res.status(200).send(review)
  } catch (err) {
    next(err)
  }
})

module.exports = router
