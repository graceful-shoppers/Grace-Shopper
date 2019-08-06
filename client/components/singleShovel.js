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
const Image = styled.img`
  @media (min-width: 768px) {
    max-width: 20vw;
  }
  max-width: 75vw;
  height: auto;
`

const Flex = styled.div`
  @media (min-width: 768px) {
    display: flex;
  }
`

const Padding = styled.div`
  @media (min-width: 768px) {
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 5%;
  }
  padding: 4%;
`

const Input = styled.input`
  height: 55px;
  width: 100px;
  font-size: 18px;
  font-family: AppleGothic;
`

const Button = styled.button`
  font-size: 18px;
  font-family: AppleGothic;
  border-radius: 15px;
  background-color: #2b9fd9
  color: white;
  padding: 1em;
  margin: 2%
  &:hover {
    box-shadow: 0px 0px 5px black;
  }
  &:focus {
    outline: 0;
  }
`

const P = styled.p``

const FormContainer = styled.div`
  display: inline-block;
  text-align: center;
`

export class SingleShovel extends React.Component {
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
    this.props.getAllReviews(this.props.match.params.shovelId)
  }

  render() {
    const shovel = this.props.selectedShovel
    return (
      <Padding>
        <SingleShovelDiv>
          <h2>{shovel.title}</h2>
          <h3>${shovel.price / 100}</h3>
          <Flex>
            <Image src={shovel.imageUrl} />

            <P>{shovel.description}</P>
          </Flex>
          <FormContainer>
            <form onSubmit={evt => this.handleClick(evt, shovel)}>
              <Input placeholder="Quantity" name="quantity" />
              <Button type="submit">Add to cart</Button>
            </form>
          </FormContainer>
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
      </Padding>
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
