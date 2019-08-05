import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import styled from 'styled-components'
import {BurgerLinkButton} from '../../public/styled-components/button'

const HamburgerButton = styled.div`
  display: inline-block;
  cursor: pointer;
  padding: 1em;

  .bar {
    width: 35px;
    height: 5px;
    background-color: black;
    margin: 6px 0;
    transition: 0.4s;
    padding-left: 5px;
  }
`

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 75%;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8); /* Black w/opacity */
  padding: 11px;
`

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 15px;
`

const ItemsCount = styled.div`
  position: absolute;
  padding-bottom: 7px;
  padding-left: 7px;
`

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 3px solid black;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const LocalButton = styled(BurgerLinkButton)`
  min-width: 100px;
  background-color: tomato;
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
    const cartStyle = {
      width: 50,
      padding: 6
    }
    return (
      <React.Fragment>
        <div>
          <HeaderDiv>
            <Container>
              <HamburgerButton onClick={() => this.burgerShow()}>
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </HamburgerButton>
              <h2>Shoveler Title</h2>
              <div>
                <Link to="/cart">
                  <img src="/cart.png" style={cartStyle} />
                </Link>
              </div>
            </Container>
          </HeaderDiv>
        </div>
        {this.state.burger ? (
          <DropDown>
            <HamburgerButton onClick={() => this.burgerShow()}>
              <div className="bar" />
              <div className="bar" />
              <div className="bar" />
            </HamburgerButton>
            <BurgerLinkButton to="/home" onClick={() => this.burgerShow()}>
              Home
            </BurgerLinkButton>
            <BurgerLinkButton to="/shovels" onClick={() => this.burgerShow()}>
              Shovels
            </BurgerLinkButton>
            <BurgerLinkButton to="/myAccount" onClick={() => this.burgerShow()}>
              My Account
            </BurgerLinkButton>
            <BurgerLinkButton to="#" onClick={this.props.handleClick}>
              Logout
            </BurgerLinkButton>
            {this.props.isAdmin ? (
              <LocalButton to="/adminPortal" onClick={() => this.burgerShow()}>
                Admin Portal
              </LocalButton>
            ) : (
              <div />
            )}

            <CartItems>
              <ItemsCount>
                {this.props.cart.products ? this.props.cart.products.length : 0}
              </ItemsCount>
              <span>
                <Link to="/cart">
                  <img src="/cart.png" style={{width: 50}} />
                </Link>
              </span>
            </CartItems>

            <hr />

            <nav>
              {this.props.isLoggedIn ? (
                <div />
              ) : (
                <div>
                  {/* The navbar will show these links before you log in */}
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </div>
              )}
            </nav>
          </DropDown>
        ) : (
          <div />
        )}
      </React.Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin,
    cart: state.cart
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
