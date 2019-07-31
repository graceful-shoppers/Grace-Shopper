const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/shovels', require('./shovels'))
router.use('/cart', require('./cart'))
router.use('/myAccount', require('./myAccount'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
