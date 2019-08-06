const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/shovels', require('./shovels'))
router.use('/checkout', require('./checkout'))
router.use('/cart', require('./cart'))
router.use('/myAccount', require('./myAccount'))
router.use('/reviews', require('./reviews'))
router.use('/adminPortal', require('./adminPortal'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
