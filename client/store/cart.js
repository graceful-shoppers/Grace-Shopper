import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_CART = 'GET_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

/**
 * INITIAL STATE
 */
const defaultCart = {}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({type: GET_CART, cart})
const removeItem = item => ({type: REMOVE_ITEM, item})

/**
 * THUNK CREATORS
 */

export const removeItemThunk = item => {
  return async dispatch => {
    const res = await axios.delete(
      `/api/cart/${item.id}/${item.product_Order.orderId}`
    )
    dispatch(removeItem(item))
  }
}

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
    case REMOVE_ITEM:
      const newProducts = state.products.filter(
        product => product.id !== action.item.id
      )

      return {...state, products: newProducts}

    default:
      return state
  }
}
