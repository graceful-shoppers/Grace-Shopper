import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ORDERS = 'GET_ORDERS'

/**
 * INITIAL STATE
 */
const orders = []

/**
 * ACTION CREATORS
 */
const getOrders = allOrders => ({type: GET_ORDERS, allOrders})

/**
 * THUNK CREATORS
 */
export const getAllOrders = () => async dispatch => {
  try {
    const res = await axios.get('/api/orders')
    dispatch(getOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = orders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
