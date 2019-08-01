import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

/**
 * INITIAL STATE
 */
const reviews = []

/**
 * ACTION CREATORS
 */
const getReviews = allReviews => ({type: GET_REVIEWS, allReviews})
const addReview = review => ({type: ADD_REVIEW, review})

/**
 * THUNK CREATORS
 */
export const getAllReviews = shovelId => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews/${shovelId}`)

    dispatch(getReviews(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addReviewThunkCreator = review => async dispatch => {
  try {
    const res = await axios.post(`/api/reviews/`, review)
    dispatch(addReview(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = reviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.allReviews
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}
