import React from 'react'
import {connect} from 'react-redux'
import {getUserOrders} from '../store/orders'
import styled from 'styled-components'
import {getCartThunk} from '../store/cart'

const OrderList = styled.div`
  display: flex;
  font-size: 15px;
  padding: 2px;
  flex-direction: row;
`
const ProductImg = styled.img`
  width: 75px;
`
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: left;
  text-overflow: ellipsis;
`
const Main = styled.div`
  padding: 10px;
  border: 2px solid black;
`

class Orders extends React.Component {
  componentDidMount() {
    this.props.getUserOrders(this.props.user.id)
    this.props.getCartThunk()
  }

  render() {
    const orders = this.props.orders
    const cartList = this.props.cart.products
    return (
      <Main>
        {orders &&
          orders.map(order => {
            return (
              <div key={order.id}>
                <OrderList>
                  {order.user ? (
                    <div>
                      <div>{order.user.email}</div>
                      <div>
                        {order.subtotal
                          ? order.subtotal
                          : cartList.reduce((acc, cur) => {
                              return acc + cur.price
                            }, 0)}
                      </div>
                      <div>Status {order.status}</div>
                      <hr />
                      Cart Products:
                      <hr />
                    </div>
                  ) : (
                    <div>
                      <div>{order.sid}</div>
                      <div>
                        Subtotal: ${order.subtotal
                          ? order.subtotal
                          : cartList.reduce((acc, cur) => {
                              return acc + cur.price
                            }, 0) / 100}
                      </div>
                      <div>Status: {order.status}</div>
                      <hr />
                      Cart Products:
                      <hr />
                      <ColumnContainer>
                        {cartList.map(product => {
                          return (
                            <RowContainer key={product.id}>
                              <ProductImg src={product.imageUrl} />
                              <div>{product.title}</div>
                              <div>{product.product_Order.quantity}</div>
                              <div>${product.product_Order.price / 100}</div>
                            </RowContainer>
                          )
                        })}
                      </ColumnContainer>
                    </div>
                  )}
                </OrderList>
              </div>
            )
          })}
      </Main>
    )
  }
}

const mapState = state => {
  return {
    userOrders: state.userOrders,
    user: state.user,
    orders: state.orders,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    getUserOrders: userId => dispatch(getUserOrders(userId)),
    getCartThunk: () => dispatch(getCartThunk())
  }
}

export default connect(mapState, mapDispatch)(Orders)
