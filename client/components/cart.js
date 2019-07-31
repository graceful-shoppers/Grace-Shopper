import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getCart(this.props.user.id)
  }

  render() {
    console.log('cart is', this.props.cart)

    const cart = this.props.cart
    let subTotal = 0
    return (
      <div>
        <h3>Items you are purchasing</h3>
        {cart.products ? (
          cart.products.map(product => {
            subTotal += product.price * product.product_Order.quantity

            return (
              <div key={product.id}>
                <h3>{product.title}</h3>
                <img src={product.imageUrl} />
                <h3>{product.product_Order.quantity}</h3>
                <h3>${product.price * product.product_Order.quantity}</h3>
              </div>
            )
          })
        ) : (
          <h3>No items in your cart</h3>
        )}

        <div>Subtotal: ${subTotal}</div>

        <button>Checkout</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getCart: id => dispatch(getCartThunk(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
