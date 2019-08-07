import React from 'react'
import {connect} from 'react-redux'
import {getAllOrders, changeSelectedOrder} from '../store/orders'
import styled from 'styled-components'

const OrderList = styled.div`
  display: flex;
  font-size: 15px;
  padding: 2px;
  margin: 10px;
  width: 280px;
  align-items: center;
  padding: 5px;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: lightgray;
  border-radius: 25px;
  justify-content: center;
`
const CategoryStyle = styled.div`
  display: flex;
  font-size: 15px;
  padding: 2px;
  margin: 10px;
  width: 280px;
  align-items: center;
  padding: 5px;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 25px;
  justify-content: center;
`

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Hidden = styled.div`
  width: 280px;
  visibility: hidden;
`

class AdminOrders extends React.Component {
  constructor() {
    super()

    this.state = {
      orderStatus: ''
    }

    this.handleOrderStatus = this.handleOrderStatus.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.selectOrders = this.selectOrders.bind(this)
  }

  componentDidMount() {
    this.props.getAllOrders('all')
  }

  async handleOrderStatus(event) {
    await this.setState({
      orderStatus: event.target.value
    })
  }

  handleOrderChange(order) {
    const updatedOrder = order
    updatedOrder.status = this.state.orderStatus
    this.props.changeSelectedOrder(order)
  }

  selectOrders() {
    const elem = document.getElementById('typeSelect')
    const type = elem.options[elem.selectedIndex].value
    this.props.getAllOrders(type)
  }

  render() {
    const orders = this.props.orders
    return (
      <FlexBox>
        <Hidden />
        <CategoryStyle>
          <h4>Category:</h4>
          <select id="typeSelect" onChange={this.selectOrders}>
            <option value="all">All orders</option>
            <option value="Created">Created</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <h6> Displaying {orders.length} orders</h6>
        </CategoryStyle>
        <Hidden />
        {orders &&
          orders.map(order => {
            return (
              <FlexBox key={order.id}>
                <OrderList>
                  {order.user ? (
                    <div>
                      <div>Email: {order.user.email}</div>
                      <div>
                        Subtotal: {order.subtotal ? order.subtotal : '$0.00'}
                      </div>
                      <div>
                        Status: {order.status}
                        <select onChange={this.handleOrderStatus}>
                          <option value="">Change Status</option>
                          <option value="Created">Created</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          type="submit"
                          onClick={() => this.handleOrderChange(order)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div>Email: Pending...</div>
                      <div>{order.subtotal ? order.subtotal : '$0.00'}</div>
                      <div>
                        {order.status}
                        <select onChange={this.handleOrderStatus}>
                          <option value="">Change Status</option>
                          <option value="Created">Created</option>
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          type="submit"
                          onClick={() => this.handleOrderChange(order)}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  )}
                </OrderList>
              </FlexBox>
            )
          })}
      </FlexBox>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getAllOrders: type => dispatch(getAllOrders(type)),
    changeSelectedOrder: order => dispatch(changeSelectedOrder(order))
  }
}

export default connect(mapState, mapDispatch)(AdminOrders)
