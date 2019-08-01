import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {connect} from 'react-redux'
import Cart from './cart'

const fromDollarToCent = amount => amount * 100

const successPayment = data => {
  alert('Your shovels are on their way')
}

const errorPayment = data => {
  alert('Payment Error')
}

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      shipping: '',
      subtotal: 0,
      orderSubmitted: false,
      cart: this.props.cart
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const subtotal = this.props.cart.products.reduce((accumulator, product) => {
      return accumulator + product.price * product.product_Order.quantity
    }, 0)
    this.setState({
      subtotal
    })
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
      .then(
        this.setState({
          ...this.state,
          orderSubmitted: true
        })
      )
      .catch(errorPayment)
  }
  render() {
    let cart = this.props.cart

    if (this.state.orderSubmitted) {
      return (
        <div>
          <h1>We have received your order! Your shovels are on their way!</h1>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <h3>Items you are purchasing</h3>
            {cart.products ? (
              cart.products.map(product => {
                {
                  /* subTotal += product.price * product.product_Order.quantity */
                }

                return (
                  <div key={product.id}>
                    <h3>{product.title}</h3>

                    <button onClick={() => this.removeFromCart(product)}>
                      delete this item
                    </button>

                    <h3>Quantity: {product.product_Order.quantity}</h3>
                    <form onSubmit={evt => this.handleClick(evt, product)}>
                      <input placeholder="quantity" name="quantity" />
                      <button type="submit">Change quantity</button>
                    </form>

                    <h3>
                      ${product.price * product.product_Order.quantity / 100}
                    </h3>
                  </div>
                )
              })
            ) : (
              <h3>No items in your cart</h3>
            )}
          </div>
          <StripeCheckout
            name="Bens cool guy shit"
            token={this.onToken}
            stripeKey="pk_test_DY5MZUNFD7FjEQYwYhz4sK9h00CNymDRBp"
            email
            amount={this.state.subtotal}
            shippingAddress
          />
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

export default connect(mapState)(Checkout)
