import React from 'react'
import {connect} from 'react-redux'
import {deleteUser} from '../store/usersAll'

class AllUsersView extends React.Component {
  render() {
    const allUsers = this.props.allUsers

    return (
      <div>
        {allUsers.map(user => {
          return (
            <div key={user.id}>
              <div>
                <h3>{user.email}</h3>
                <h6>{user.isAdmin}</h6>
              </div>
              <div />
              <button type="button">Delete</button>
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
    deleteUser: userId => dispatch(deleteUser(userId))
  }
}

export default connect(mapState, mapDispatch)(AllUsersView)
