import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Image = styled.img`
max-height: 100vh
max-width: 100vw`
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Image src="https://yachtclubgames.com/wp-content/uploads/2017/03/shovelKnight007.png" />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
