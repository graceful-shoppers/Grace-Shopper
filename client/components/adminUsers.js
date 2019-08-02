import React from 'react'
import {connect} from 'react-redux'
import {deleteUser} from '../store/usersAll'
import {editUserAdmin} from '../store/user'

class AllUsersView extends React.Component {
  constructor() {
    super()

    this.promoteUser = this.promoteUser.bind(this)
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
      <div>
        {allUsers.map(user => {
          return (
            <div key={user.id}>
              <div>
                <h3>{user.email}</h3>
                <h6>
                  {user.isAdmin ? (
                    <div>Administrator</div>
                  ) : (
                    <div>
                      <div>User</div>
                      <button
                        type="button"
                        onClick={() => this.promoteUser(user)}
                      >
                        Promote
                      </button>
                    </div>
                  )}
                </h6>
              </div>
              <button
                type="button"
                onClick={() => this.resetUserPassword(user)}
              >
                Reset Password
              </button>
              <button
                type="button"
                onClick={() => this.props.deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          )
        })}
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
    deleteUser: userId => dispatch(deleteUser(userId)),
    editUserAdmin: user => dispatch(editUserAdmin(user))
  }
}

export default connect(mapState, mapDispatch)(AllUsersView)
