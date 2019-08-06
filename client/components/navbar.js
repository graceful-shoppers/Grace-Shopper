import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import styled from 'styled-components'
import {BurgerLinkButton} from '../../public/styled-components/buttons'

const HamburgerButton = styled.div`
  display: inline-block;
  cursor: pointer;
  padding: 1em;

  .bar {
    width: 35px;
    height: 5px;
    background-color: rgb(66, 245, 179);
    margin: 6px 0;
    transition: 0.4s;
    padding-left: 5px;
  }
`

const Navvy = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  backgroundcolor: black;
  color: rgb(66, 245, 179);
`

const DropDown = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 75%;
  position: fixed;
  z-index: 5;
  left: 0;
  top: 0;
  background-color: black;
  padding: 2px;
  max-width: 340px;
`

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: pink;
  font-size: 15px;
  width: 50;
  padding-right: 10px;
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
  background-color: black;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 100%;
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
    this.logoutOnclicks = this.logoutOnclicks.bind(this)
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

  logoutOnclicks() {
    this.burgerShow()
    this.props.handleClick()
  }

  render() {
    return (
      <React.Fragment>
        <Navvy>
          <HeaderDiv>
            <Container>
              <HamburgerButton onClick={() => this.burgerShow()}>
                <div className="bar" />
                <div className="bar" />
                <div className="bar" />
              </HamburgerButton>
              <h2>Shoveler Title</h2>
              <CartItems>
                <ItemsCount>
                  {this.props.cart.products
                    ? this.props.cart.products.length
                    : 0}
                </ItemsCount>
                <span>
                  <Link to="/cart">
                    <img src="/cart.png" style={{width: 50}} />
                  </Link>
                </span>
              </CartItems>
            </Container>
          </HeaderDiv>
        </Navvy>
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
            {this.props.isLoggedIn ? (
              <BurgerLinkButton
                to="/myAccount"
                onClick={() => this.burgerShow()}
              >
                My Account
              </BurgerLinkButton>
            ) : (
              <BurgerLinkButton to="/signup" onClick={() => this.burgerShow()}>
                Sign Up
              </BurgerLinkButton>
            )}
            {this.props.isLoggedIn ? (
              <BurgerLinkButton to="#" onClick={() => this.logoutOnclicks()}>
                Logout
              </BurgerLinkButton>
            ) : (
              <BurgerLinkButton to="/login" onClick={() => this.burgerShow()}>
                Login
              </BurgerLinkButton>
            )}
            {this.props.isAdmin ? (
              <LocalButton to="/adminPortal" onClick={() => this.burgerShow()}>
                Admin Portal
              </LocalButton>
            ) : (
              <div />
            )}
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
