const router = require('express').Router()
const {Order, User} = require('../db/models')

router.put('/:id', async (req, res, next) => {
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

module.exports = router
