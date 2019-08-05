import React from 'react'
import {connect} from 'react-redux'
import {getAllOrders, changeSelectedOrder} from '../store/orders'
import styled from 'styled-components'

const OrderList = styled.div`
  display: flex;
  font-size: 15px;
  padding: 2px;
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
      <div>
        <div>
          <h4>Category:</h4>
          <select id="typeSelect" onChange={this.selectOrders}>
            <option value="all">All orders</option>
            <option value="Created">Created</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <h6> Displaying {orders.length} orders</h6>
        </div>
        {orders &&
          orders.map(order => {
            return (
              <div key={order.id}>
                <OrderList>
                  {order.user ? (
                    <div>
                      <div>{order.user.email}</div>
                      <div>
                        {order.subtotal ? order.subtotal : '$FILLED IN VALUE'}
                      </div>
                      <div> {order.createdAt}</div>
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
                  ) : (
                    <div>
                      <div>{order.sid}</div>
                      <div>
                        {order.subtotal ? order.subtotal : '$FILLED IN VALUE'}
                      </div>
                      <div> {order.createdAt}</div>
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
              </div>
            )
          })}
      </div>
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
