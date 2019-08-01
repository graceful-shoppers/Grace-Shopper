const router = require('express').Router()
const stripe = require('stripe')('sk_test_gpMBV53Rxvu2RkZQfLLRNNSE004rlxLEsb')
const pick = require('lodash.pick')

router.get('/', (req, res, next) => {
  res.send({
    message: 'Hello Stripe checkout server',
    timestamp: new Date().toISOString
  })
})

const verifyAmount = (receivedValue, cart) => {
  cart.reduce((total, product) => {
    //get the value * quantity for each product and return that plus the total
    //if it matches return true, if not false
  })
}

const updateDb = () => {}

router.post('/', async (req, res, next) => {
  try {
    // if(req.body.amount !== the value of everything in req.cart) throw an error
    const chargePayload = pick(req.body, ['source', 'currency', 'amount'])
    await stripe.charges.create(chargePayload)
    res.status(200).send()
  } catch (err) {
    res.status(500).send({error: err})
    console.log(err)
  }
})

//key pk_test_DY5MZUNFD7FjEQYwYhz4sK9h00CNymDRBp
module.exports = router
