const router = require('express').Router()
const stripe = require('stripe')('sk_test_gpMBV53Rxvu2RkZQfLLRNNSE004rlxLEsb')

router.get('/', (req, res, next) => {})

router.post('/', async (req, res, next) => {
  console.log('in checkout post')
  console.log(req)
  try {
    const charge = await stripe.charges.create(
      {
        amount: 999,
        currency: 'usd',
        source: 'tok_visa',
        receipt_email: 'jenny.rosen@example.com'
      },
      function(err, charge) {
        if (err) {
          console.log(err)
        } else {
          console.log('success')
        }
      }
    )
  } catch (err) {
    console.log(err)
  }
})

//key pk_test_DY5MZUNFD7FjEQYwYhz4sK9h00CNymDRBp
module.exports = router
