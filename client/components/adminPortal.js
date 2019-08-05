import React from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/usersAll'
import styled from 'styled-components'
import {BurgerLinkButton} from '../../public/styled-components/button'

const AdminOptions = styled.div`
  display: flex;
  justify-content: space-around;
`

const LocalButton = styled(BurgerLinkButton)`
  min-width: 100px;
  background-color: tomato;
`

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
      <AdminOptions>
        <LocalButton to="/adminPortal/allUsers">Users</LocalButton>
        <LocalButton to="/adminPortal/allShovels">Shovels</LocalButton>
        <LocalButton to="/adminPortal/allOrders">Orders</LocalButton>
      </AdminOptions>
    )
  }
}

const mapState = state => {
  return {
    allUsers: state.allUsers,
    allOrders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapState, mapDispatch)(MyAccount)
