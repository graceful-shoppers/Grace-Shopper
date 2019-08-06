import React from 'react'
import {} from '../store/usersAll'
import styled from 'styled-components'
import {BurgerLinkButton} from '../../public/styled-components/buttons'

const AdminOptions = styled.div`
  display: flex;
  justify-content: space-around;
`

const LocalButton = styled(BurgerLinkButton)`
  min-width: 100px;
  background-color: tomato;
`

class MyAccount extends React.Component {
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

export default MyAccount
