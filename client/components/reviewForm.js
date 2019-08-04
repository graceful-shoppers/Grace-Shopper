import React from 'react'
import StarRatingComponent from 'react-star-rating-component'
import {connect} from 'react-redux'
import {addReviewThunkCreator} from '../store/reviews'

class ReviewForm extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      rating: 5
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue})
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const review = {
      productId: this.props.shovelId,
      text: this.state.text,
      rating: this.state.rating
    }

    this.props.addReview(review)
    this.setState({text: ''})
  }
  render() {
    return (
      <div>
        <h3>Leave a Review</h3>
        <StarRatingComponent
          name="rating"
          starCount={5}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
        <input
          type="text"
          value={this.state.text}
          onChange={this.handleChange}
          name="text"
        />
        <button type="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addReview: review => dispatch(addReviewThunkCreator(review))
  }
}

export default connect(null, mapDispatch)(ReviewForm)
