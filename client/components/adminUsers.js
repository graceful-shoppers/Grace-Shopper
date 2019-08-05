import React from 'react'
import {connect} from 'react-redux'
import {deleteUser, getAllUsers} from '../store/usersAll'
import {editUserAdmin} from '../store/user'
import styled from 'styled-components'

// const size = {
//   mobileS: '320px',
//   mobileM: '375px',
//   mobileL: '425px',
//   tablet: '768px',
//   laptop: '1024px',
//   laptopL: '1440px',
//   desktop: '2560px'
// }

// const device = {
//   mobileS: `(min-width: ${size.mobileS})`,
//   mobileM: `(min-width: ${size.mobileM})`,
//   mobileL: `(min-width: ${size.mobileL})`,
//   tablet: `(min-width: ${size.tablet})`,
//   laptop: `(min-width: ${size.laptop})`,
//   laptopL: `(min-width: ${size.laptopL})`,
//   desktop: `(min-width: ${size.desktop})`,
//   desktopL: `(min-width: ${size.desktop})`
// }

// &:last-child {
//   @media ${device.tablet} {
//     flex-grow: 0;
//     min-width: 349px;
//   }
//   @media ${device.laptop} {
//     flex-grow: 0;
//     min-width: 309px;
//   }
//   @media ${device.laptopL} {
//     flex-grow: 0;
//     min-width: 447px;
//   }
//   @media ${device.desktop} {
//     flex-grow: 1;
//   }
// }

const EachUser = styled.div`
  margin-top: 5px;
  padding: 10px;
  border: 1px solid black;
  flex-basis: 22%;
  flex-grow: 1;
  margin-left: 2.5px;
  margin-right: 2.5px;
  min-width: 250px;
  justify-content: flex-start;
`

const UserListing = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

const BasicButton = styled.button`
  border: 1px solid black;
  color: black;
  font-size: 12px;
`

const DeleteButton = styled.button`
  border: 1px solid black;
  color: black;
  background-color: tomato;
  font-size: 12px;
`

const UserEmail = styled.div`
  font-size: 14px;
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
        {allUsers.map(user => {
          return (
            <EachUser className="EachUser" key={user.id}>
              <div>
                <UserEmail>{user.email}</UserEmail>
                {user.isAdmin ? (
                  <div>Administrator</div>
                ) : (
                  <div>
                    <div>User</div>
                  </div>
                )}
                <div>
                  <BasicButton
                    type="button"
                    onClick={() => this.resetUserPassword(user)}
                  >
                    Reset Password
                  </BasicButton>
                  {!user.isAdmin && (
                    <BasicButton
                      type="button"
                      onClick={() => this.promoteUser(user)}
                    >
                      Promote
                    </BasicButton>
                  )}
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
