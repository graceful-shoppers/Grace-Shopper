import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

const Review = props => {
  return (
    <div>
      <StarRatingComponent starCount={5} value={props.value} />
      <p>{props.text}</p>
    </div>
  )
}

export default Review
