import React from 'react'
import {connect} from 'react-redux'
import {getAllOrders} from '../store/myAccountOrders'

class Orders extends React.Component {
  componentDidMount() {
    this.props.getShovel(this.props.match.params.shovelId)
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
    getShovel: shovelId => dispatch(getAllOrders(shovelId))
  }
}

export default connect(mapState, mapDispatch)(Orders)
