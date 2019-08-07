import React from 'react'
import {connect} from 'react-redux'
import {getCartThunk} from '../store/cart'
import {removeItemThunk} from '../store/cart'
import {updateItemThunk} from '../store/cart'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Checkout = styled(Link)`
  display: flex;
  bottom: 1;
  justify-content: center;
  font-size: 18px;
  font-family: AppleGothic;
  border-radius: 15px;
  background-color: limegreen;
  color: white;
  padding: 1em;
  &:hover {
    box-shadow: 0px 0px 5px black;
  }
  &:focus {
    outline: 0;
  }
  margin: 1em;
`

const Delete = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 10%;

  @media (min-width: 768px) {
    justify-content: flex-end;
    margin-left: 14rem;
    margin-right: 3rem;
  }
`

const Update = styled.button`
  display: flex;
  justify-content: center;
  font-size: 10px;
  font-family: AppleGothic;
  border-radius: 15px;
  background-color: orange;
  color: white;
  padding: 1em;
  &:hover {
    box-shadow: 0px 0px 5px black;
  }
  &:focus {
    outline: 0;
  }
  width: 50%;
  margin-bottom: 5px;
`

const CartCardDiv = styled.div`
  display: flex;
  flex-direction: row;
`

const CartItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid grey;
  margin-bottom: 1em;
  margin-top: 1em;
`

const Page = styled.div`
  position: fixed;
  top: 10%;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CartDiv = styled.div`
  display: flex;
  font-family: AppleGothic;
  flex-direction: column;
  width: 80%
  margin-top: 1rem;
  margin-left: 1rem;
`

const CheckoutDiv = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: AppleGothic;
`

const ItemImgDiv = styled.div`
  display: flex;
  width: 50%;
`

const ItemInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  #title {
    font-size: 14px;
    @media (min-width: 768px) {
      font-size: 16px;
    }
  }

  #price {
    font-size: 12px;
    @media (min-width: 768px) {
      font-size: 12px;
    }
  }
`

const ModifyItemDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`

const StyledImg = styled.img`
  width: 75px;
  height: 75px;

  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
  }
`

const Quantity = styled.label`
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 100px;

  .label {
    position: absolute;
    top: 16px;
    left: 0;
    font-size: 16px;
    color: #9098a9;
    font-weight: 500;
    transform-origin: 0 0;
    transition: all 0.2s ease;
  }

  .border {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background: #07f;
    transform: scaleX(0);
    transform-origin: 0 0;
    transition: all 0.15s ease;
  }

  input {
    -webkit-appearance: none;
    width: 100%;
    border: 0;
    font-family: inherit;
    padding: 12px 0;
    height: 12px;
    font-size: 16px;
    font-weight: 500;
    border-bottom: 2px solid #c8ccd4;
    background: none;
    border-radius: 0;
    color: #223254;
    transition: all 0.15s ease;
  }

  input:hover {
    background: rgba(34, 50, 84, 0.03);
  }

  input:not(:placeholder-shown) + span {
    color: #5a667f;
    transform: translateY(-26px) scale(0.75);
  }

  input:focus {
    background: none;
    outline: none;
  }

  input:focus + span {
    color: #07f;
    transform: translateY(-26px) scale(0.75);
  }

  input:focus + span + .border {
    transform: scaleX(1);
  }
`

const CartItem = props => {
  return (
    <CartItemDiv>
      <CartCardDiv onClick={() => props.viewItem(props.product)}>
        <ItemImgDiv>
          <StyledImg src={props.product.imageUrl} />
        </ItemImgDiv>

        <ItemInfoDiv>
          <span id="title">{props.product.title}</span>
          <br />
          <span id="price">Price: ${props.product.price / 100}</span>
        </ItemInfoDiv>
      </CartCardDiv>

      <ModifyItemDiv>
        <form
          style={{display: 'flex'}}
          autoComplete="off"
          onSubmit={evt => props.handleClick(evt, props.product)}
        >
          <Quantity htmlFor="quantity">
            <input name="quantity" type="text" id="inp" placeholder="&nbsp;" />
            <span className="label">
              {props.product.product_Order.quantity}
            </span>
            <span className="border" />
          </Quantity>

          <Update type="submit">Update</Update>
        </form>

        <Delete onClick={() => props.removeFromCart(props.product)}>
          <h1>🗑</h1>
        </Delete>
      </ModifyItemDiv>
    </CartItemDiv>
  )
}

export class Cart extends React.Component {
  constructor() {
    super()
    this.state = {}

    this.removeFromCart = this.removeFromCart.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.viewItem = this.viewItem.bind(this)
  }

  handleClick(evt, product) {
    evt.preventDefault()
    let newQuantity = parseInt(event.target.quantity.value)
    event.target.quantity.value = ''

    if (newQuantity === 0) {
      this.removeFromCart(product)
      return
    }

    if (!newQuantity) {
      return
    }

    const newProductOrder = {
      userId: this.props.user.id,
      productId: product.id,
      quantity: newQuantity,
      price: product.price,
      changeQuantity: true
    }

    this.props.updateItem(newProductOrder)
  }

  viewItem(shovel) {
    this.props.history.push(`/shovels/${shovel.id}`)
  }

  removeFromCart(product) {
    this.props.removeItem(product)
  }

  componentDidMount() {
    this.props.getCart()
  }

  render() {
    let cart = this.props.cart
    let subTotal = 0

    return (
      <Page>
        <CartDiv>
          {cart.products.length ? (
            cart.products.map(product => {
              subTotal += product.price * product.product_Order.quantity

              return (
                <CartItem
                  key={product.id}
                  product={product}
                  handleClick={this.handleClick}
                  removeFromCart={this.removeFromCart}
                  viewItem={this.viewItem}
                />
              )
            })
          ) : (
            <h3>No items in your cart</h3>
          )}
        </CartDiv>
        <CheckoutDiv>
          {cart.products.length ? (
            <React.Fragment>
              Subtotal: ${subTotal / 100}
              <Checkout to="/checkout">Checkout</Checkout>
            </React.Fragment>
          ) : (
            <Link to="/shovels">Continue shopping!</Link>
          )}
        </CheckoutDiv>
      </Page>
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
    removeItem: item => dispatch(removeItemThunk(item)),
    updateItem: item => dispatch(updateItemThunk(item)),
    getCart: () => dispatch(getCartThunk())
  }
}

export default connect(mapState, mapDispatch)(Cart)
