import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class TakeMoney extends React.Component {
  constructor() {
    super()
    this.state = {
      shipping: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  onToken = token => {
    console.log('token')
    fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`)
      })
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // ...

  render() {
    return (
      <div>
        {/* put some information about the persons cart here */}
        <form>
          <label>
            Shipping Address:
            <input type="text" name="shipping" onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Email Address:
            <input type="text" name="email" onChange={this.handleChange} />
          </label>
        </form>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_DY5MZUNFD7FjEQYwYhz4sK9h00CNymDRBp"
        />
      </div>
    )
  }
}
