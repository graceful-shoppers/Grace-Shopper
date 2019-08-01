import React from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store/myAccountOrders'

class Orders extends React.Component {
  componentDidMount() {
    this.props.getAllOrders(this.props.match.params.orderId)
  }

  render() {
    return (
      <div>
        <div>Here is an order</div>
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
    getAllOrders: orderId => dispatch(getAllOrders(orderId))
  }
}

export default connect(mapState, mapDispatch)(Orders)
