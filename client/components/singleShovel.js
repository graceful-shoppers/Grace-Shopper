import React from 'react'
import {connect} from 'react-redux'
import {getShovel} from '../store/singleShovel'
import {addItemThunk} from '../store/cart'
import styled from 'styled-components'
import Review from './review'
import {getAllReviews} from '../store/reviews'
import ReviewForm from './reviewForm'

const SingleShovelDiv = styled.div`
  display: flex;
  flex-direction: column;
`

// const SingleReview = props => {
//   return <div />
// }

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
    console.log('this.props.match :', this.props.match)
    this.props.getShovel(this.props.match.params.shovelId)
    this.props.getAllReviews(this.props.match.params.shovelId)
  }

  render() {
    const shovel = this.props.selectedShovel
    return (
      <div className="shovel">
        <SingleShovelDiv>
          <h3>{shovel.title}</h3>
          <h6>${shovel.price / 100}</h6>
          <img src={shovel.imageUrl} />
          <form onSubmit={evt => this.handleClick(evt, shovel)}>
            <input placeholder="quantity" name="quantity" />
            <button type="submit">Add to cart</button>
          </form>
          <p>{shovel.description}</p>

        </SingleShovelDiv>


          <h3> Reviews </h3>


        {this.props.reviews.map(review => {
          return (
            <Review
              value={review.rating}
              text={review.text}
              key={review.id}
              name={review.id}
            />
          )
        })}

        <ReviewForm shovelId={shovel.id} />

      </div>
    )
  }
}

const mapState = state => {
  return {
    selectedShovel: state.singleShovel,
    user: state.user,
    reviews: state.reviews
  }
}

const mapDispatch = dispatch => {
  return {
    getShovel: shovelId => dispatch(getShovel(shovelId)),
    addItem: item => dispatch(addItemThunk(item)),
    getAllReviews: shovelId => dispatch(getAllReviews(shovelId))
  }
}

export default connect(mapState, mapDispatch)(SingleShovel)
