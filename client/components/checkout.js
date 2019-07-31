import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const fromDollarToCent = amount => amount * 100

const successPayment = data => {
  alert('Your shovels are on their way')
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = (amount, description, email, shipping) => token =>
  axios
    .post('/api/checkout', {
      // name: 'Ben',
      description: 'description',
      source: token.id,
      currency: 'USD',
      amount: fromDollarToCent(amount),
      metadata: {
        email,
        shipping
      }
    })
    .then(successPayment)
    .catch(errorPayment)

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      shipping: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <div>
        <form>
          <label>
            Email Address
            <input name="email" onChange={this.handleChange} />
          </label>
          <label>
            Shipping Address
            <input name="shipping" onChange={this.handleChange} />
          </label>
        </form>
        <StripeCheckout
          name="Bens cool guy shit"
          token={onToken(
            321,
            'cool stuff',
            this.state.email,
            this.state.shipping
          )}
          stripeKey="pk_test_DY5MZUNFD7FjEQYwYhz4sK9h00CNymDRBp"
          email={this.state.email}
          shipping={this.state.shipping}
        />
      </div>
    )
  }
}

export default Checkout
