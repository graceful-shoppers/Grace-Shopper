import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/usersAll'

class MyAccount extends React.Component {
  constructor() {
    super()

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    this.props.getAllUsers()
  }

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

const mapState = state => {
  return {
    allUsers: state.allUsers
  }
}

const mapDispatch = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapState, mapDispatch)(MyAccount)
