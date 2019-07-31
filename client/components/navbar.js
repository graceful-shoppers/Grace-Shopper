import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import styled from 'styled-components'

const HamburgerButton = styled.div`
  display: inline-block;
  cursor: pointer;

  .bar {
    width: 35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
  }
`
const DropDown = styled.div`
  display: flex;
  flex-direction: column;
`
class Navbar extends React.Component {
  constructor() {
    super()

    this.state = {
      burger: false
    }
    this.burgerShow = this.burgerShow.bind(this)
  }

  burgerShow() {
    console.log(this.state)
    if (this.state.burger) {
      this.setState({
        burger: false
      })
    } else {
      this.setState({
        burger: true
      })
    }
  }

  render() {
    return (
      <div>
        <HamburgerButton onClick={() => this.burgerShow()}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </HamburgerButton>
        {this.state.burger ? (
          <DropDown>
            <Link to="/home">Home</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/faq">FAQ</Link>
          </DropDown>
        ) : (
          <div />
        )}

        <div />
        <h1>Graceful Shoveler</h1>
        <nav>
          {this.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={this.handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
