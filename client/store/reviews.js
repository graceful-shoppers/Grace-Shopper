import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'

/**
 * INITIAL STATE
 */
const reviews = []

/**
 * ACTION CREATORS
 */
const getReviews = allReviews => ({type: GET_REVIEWS, allReviews})

/**
 * THUNK CREATORS
 */
export const getAllReviews = shovelId => async dispatch => {
  try {
    const res = await axios.get(`/api/reviews/${shovelId}`)
    console.log('res :', res)
    dispatch(getReviews(res.data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = reviews, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return action.allReviews
    default:
      return state
  }
}
