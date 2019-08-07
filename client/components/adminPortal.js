import React from 'react'
import {} from '../store/usersAll'
import styled from 'styled-components'
import {BurgerLinkButton} from '../../public/styled-components/buttons'

const AdminOptions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-top: 100px;
`

const LocalButton = styled(BurgerLinkButton)`
  min-width: 100px;
  min-height: 80px;
  background-color: tomato;
  vertical-align: middle;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: auto;
  border: none;
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
