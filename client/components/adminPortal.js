import React from 'react'
import {Link} from 'react-router-dom'

class MyAccount extends React.Component {
  render() {
    return (
      <div>
        <button type="button">
          <Link to="/adminPortal/allUsers">Review Users</Link>
        </button>
        <button type="button">
          <Link to="/adminPortal/allShovels">Review Shovels</Link>
        </button>
        <button type="button">
          <Link to="/adminPortal/allOrders">Review Orders</Link>
        </button>
      </div>
    )
  }
}

export default MyAccount
