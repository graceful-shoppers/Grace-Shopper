import React from 'react'
import {connect} from 'react-redux'
import {deleteUser, getAllUsers} from '../store/usersAll'
import {editUserAdmin} from '../store/user'
import styled from 'styled-components'
import {BasicButton, DeleteButton} from '../../public/styled-components/buttons'

const EachUser = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid black;
  width: 250px;
  display: flex;
  flex-direction: column;
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
const FontSizeDiv = styled.div`
  font-size: 18px;
  white-space: nowrap;
  width: 60%;
`
const MappedUsers = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`
const PromoteButton = styled(BasicButton)`
  border: none;
  background-color: rgba(50, 205, 50, 0.4);
  border-radius: 40px;
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
        <MappedUsers>
          {allUsers.map(user => {
            return (
              <EachUser className="EachUser" key={user.id}>
                <UserEmail className="tooltip">{user.email}</UserEmail>
                <div>
                  {user.isAdmin ? (
                    <FontSizeDiv>Administrator</FontSizeDiv>
                  ) : (
                    <FontSizeDiv>
                      User{' '}
                      <PromoteButton
                        type="button"
                        onClick={() => this.promoteUser(user)}
                      >
                        Promote
                      </PromoteButton>
                    </FontSizeDiv>
                  )}

                  <BasicButton
                    type="button"
                    onClick={() => this.resetUserPassword(user)}
                  >
                    Reset Password
                  </BasicButton>

                  <DeleteButton
                    type="button"
                    onClick={() => this.props.deleteUser(user.id)}
                  >
                    Delete
                  </DeleteButton>
                </div>
              </EachUser>
            )
          })}
        </MappedUsers>
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
