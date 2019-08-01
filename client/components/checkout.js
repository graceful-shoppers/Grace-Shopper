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

class Checkout extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      shipping: '',
      amount: 500
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onToken = (token, addresses) => {
    axios
      .post('/api/checkout', {
        // name: 'Ben',
        description: 'description',
        source: token.id,
        currency: 'USD',
        amount: this.state.amount,

        metadata: {
          email: 'ben@me.com'
          // addresses
        }
      })
      .then(successPayment)
      .catch(errorPayment)
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
          token={this.onToken}
          stripeKey="pk_test_DY5MZUNFD7FjEQYwYhz4sK9h00CNymDRBp"
          email
          amount={this.state.amount}
          shippingAddress
        />
      </div>
    )
  }
}

export default Checkout
