import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})

/**
 * THUNK CREATORS
 */
export const getCartThunk = id => async dispatch => {
  try {
    const res = await axios.get(`/api/cart/${id}`)
    dispatch(getCart(res.data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
