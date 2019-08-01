import React from 'react'
import {connect} from 'react-redux'
import {getShovel} from '../store/singleShovel'
import {addItemThunk} from '../store/cart'
import styled from 'styled-components'

const SingleShovelDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const SingleReview = props => {
  return <div />
}

class SingleShovel extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(evt, shovel) {
    evt.preventDefault()

    var addNum = parseInt(event.target.quantity.value)

    if (!addNum) {
      addNum = 1
    }

    const newProductOrder = {
      userId: this.props.user.id,
      productId: shovel.id,
      quantity: addNum,
      price: shovel.price
    }

    this.props.addItem(newProductOrder)
  }

  componentDidMount() {
    this.props.getShovel(this.props.match.params.shovelId)
  }

  render() {
    const shovel = this.props.selectedShovel
    return (
      <SingleShovelDiv>
        <h3>{shovel.title}</h3>
        <h6>${shovel.price / 100}</h6>
        <img src={shovel.imageUrl} />
        <form onSubmit={evt => this.handleClick(evt, shovel)}>
          <input placeholder="quantity" name="quantity" />
          <button type="submit">Add to cart</button>
        </form>

        <button>View Reviews</button>
      </SingleShovelDiv>
    )
  }
}

const mapState = state => {
  return {
    selectedShovel: state.singleShovel,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getShovel: shovelId => dispatch(getShovel(shovelId)),
    addItem: item => dispatch(addItemThunk(item))
  }
}

export default connect(mapState, mapDispatch)(SingleShovel)
