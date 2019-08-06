import React from 'react'
import {connect} from 'react-redux'
import Orders from './orders'
import styled from 'styled-components'

const Head = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2em;
  padding-top: 10px;
`

class MyAccount extends React.Component {
  render() {
    return (
      <div>
        <Head>My Account</Head>
        <h3>
          <Orders />
        </h3>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userOrders: state.userOrders,
    user: state.user,
    orders: state.orders
  }
}

export default connect(mapState)(MyAccount)
