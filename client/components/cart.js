import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'
import {removeItemThunk} from '../store/cart'
import {addItemThunk} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {}

    this.removeFromCart = this.removeFromCart.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getCart(this.props.user.id)
    // this.setState(this.props.cart)
  }

  handleClick(evt, product) {
    evt.preventDefault()
    let newQuantity = parseInt(event.target.quantity.value)

    if (!newQuantity) {
      quantity = product.product_Order.quantity
    }

    const newProductOrder = {
      userId: this.props.user.id,
      productId: product.id,
      quantity: newQuantity,
      price: product.price,
      changeQuantity: true
    }

    this.props.addItem(newProductOrder)
  }

  removeFromCart(product) {
    console.log(product)
    this.props.removeItem(product)
  }

  render() {
    let cart = this.props.cart

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
                <button onClick={() => this.removeFromCart(product)}>
                  delete this item
                </button>

                <h3>Quantity: {product.product_Order.quantity}</h3>
                <form onSubmit={evt => this.handleClick(evt, product)}>
                  <input placeholder="quantity" name="quantity" />
                  <button type="submit">Change quantity</button>
                </form>

                <h3>${product.price * product.product_Order.quantity / 100}</h3>
              </div>
            )
          })
        ) : (
          <h3>No items in your cart</h3>
        )}

        <div>Subtotal: ${subTotal / 100}</div>

        <button onClick={() => console.log('clicked')}>Checkout</button>
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
    getCart: id => dispatch(getCartThunk(id)),
    removeItem: item => dispatch(removeItemThunk(item)),
    addItem: item => dispatch(addItemThunk(item))
  }
}

export default connect(mapState, mapDispatch)(Cart)
