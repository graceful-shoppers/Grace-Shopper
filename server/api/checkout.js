const router = require('express').Router()
const stripe = require('stripe')('sk_test_gpMBV53Rxvu2RkZQfLLRNNSE004rlxLEsb')

router.get('/', (req, res, next) => {
  res.send({
    message: 'Hello Stripe checkout server',
    timestamp: new Date().toISOString
  })
})

router.post('/', async (req, res, next) => {
  console.log('req; ', req)
  try {
    await stripe.charges.create(req.body)
    res.status(200).send()
  } catch (err) {
    res.status(500).send({error: err})
    console.log(err)
  }
})

//key pk_test_DY5MZUNFD7FjEQYwYhz4sK9h00CNymDRBp
module.exports = router
