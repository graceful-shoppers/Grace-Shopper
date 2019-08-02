import React from 'react'
import {connect} from 'react-redux'
import {editSelfPassword} from '../store/user'

class ResetPassword extends React.Component {
  constructor() {
    super()

    this.state = {
      newPassword: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.changePassword = this.changePassword.bind(this)
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  changePassword(user) {
    user.password = this.state.newPassword
    user.newPasswordReset = false
    this.props.editSelfPassword(user)
  }

  render() {
    return (
      <div>
        Looks like it is time to reset your password!
        <div>
          <input type="text" name="newPassword" onChange={this.handleChange} />
          <button
            type="button"
            onClick={() => this.changePassword(this.props.user)}
          >
            Submit
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    editSelfPassword: user => dispatch(editSelfPassword(user))
  }
}

export default connect(mapState, mapDispatch)(ResetPassword)
