import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

const Review = props => {
  return (
    <div>
      <StarRatingComponent
        name={`${props.name}`}
        starCount={5}
        value={props.value}
      />
      <p>{props.text}</p>
      <hr />
    </div>
  )
}

export default Review
