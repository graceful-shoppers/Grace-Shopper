import React from 'react'
import {connect} from 'react-redux'
import {deleteUser, getAllUsers} from '../store/usersAll'
import {editUserAdmin} from '../store/user'
import styled from 'styled-components'
import {BasicButton, DeleteButton} from '../../public/styled-components/buttons'

const EachUser = styled.div`
  // padding: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid black;
  flex-basis: 22%;
  flex-grow: 1;
  min-width: 250px;
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  text-align: left;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
`

const UserListing = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`

const UserEmail = styled.div`
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const UserListingHeader = styled.div`
  display: flex;
  flex-direction: row;
  background-color: black;
  color: white;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  border-left: 1px solid black;
  border-right: 1px solid black;
`
const FontSizeDiv = styled.div`
  font-size: 18px;
  white-space: nowrap;
  width: 60%;
`

class AllUsersView extends React.Component {
  constructor() {
    super()

    this.promoteUser = this.promoteUser.bind(this)
  }

  componentDidMount() {
    this.props.getAllUsers()
  }

  promoteUser(user) {
    let adminUser = user
    adminUser.isAdmin = true
    this.props.editUserAdmin(adminUser)
  }

  resetUserPassword(user) {
    let updatedUser = user
    updatedUser.needPasswordReset = true
    this.props.editUserAdmin(updatedUser)
  }

  render() {
    const allUsers = this.props.allUsers

    return (
      <UserListing>
        <UserListingHeader>
          <FontSizeDiv>Email</FontSizeDiv>
          <FontSizeDiv>Status</FontSizeDiv>
          <FontSizeDiv>User Options</FontSizeDiv>
        </UserListingHeader>
        {allUsers.map(user => {
          return (
            <EachUser className="EachUser" key={user.id}>
              <UserEmail className="tooltip">
                {user.email}
                <span className="tooltiptext">{user.email}</span>
              </UserEmail>
              {user.isAdmin ? (
                <FontSizeDiv>Administrator</FontSizeDiv>
              ) : (
                <FontSizeDiv>
                  User{' '}
                  <BasicButton
                    type="button"
                    onClick={() => this.promoteUser(user)}
                  >
                    Promote
                  </BasicButton>
                </FontSizeDiv>
              )}
              <div>
                <div>
                  <BasicButton
                    type="button"
                    onClick={() => this.resetUserPassword(user)}
                  >
                    Reset Password
                  </BasicButton>
                </div>
                <div>
                  <DeleteButton
                    type="button"
                    onClick={() => this.props.deleteUser(user.id)}
                  >
                    Delete
                  </DeleteButton>
                </div>
              </div>
            </EachUser>
          )
        })}
      </UserListing>
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
    deleteUser: userId => dispatch(deleteUser(userId)),
    editUserAdmin: user => dispatch(editUserAdmin(user)),
    getAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapState, mapDispatch)(AllUsersView)
