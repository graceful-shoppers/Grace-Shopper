import React from 'react'
import {Link} from 'react-router-dom'

class MyAccount extends React.Component {
  render() {
    return (
      <div>
        <Link to="/myAccount/orders">Your Orders</Link>
        <div>Login & Security</div>
        <div>Leave a review</div>
      </div>
    )
  }
}

export default MyAccount
