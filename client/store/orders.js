import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ORDERS = 'GET_ORDERS'
const CHANGE_ORDER = 'CHANGE_ORDER'
const GET_USER_ORDERS = 'GET_USER_ORDERS'

/**
 * INITIAL STATE
 */
const orders = []

/**
 * ACTION CREATORS
 */

const getOrders = allOrders => ({type: GET_ORDERS, allOrders})
const changeOrder = order => ({type: CHANGE_ORDER, order})
const getUserOrder = userOrders => ({type: GET_USER_ORDERS, userOrders})

/**
 * THUNK CREATORS
 */
export const getAllOrders = type => async dispatch => {
  try {
    const res = await axios.get(`/api/adminPortal/orders/${type}`)
    dispatch(getOrders(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getUserOrders = userId => async dispatch => {
  try {
    const userOrders = await axios.get(`/api/orders/${userId}`)
    dispatch(getUserOrder(userOrders.data))
  } catch (err) {
    console.error(err)
  }
}

export const changeSelectedOrder = order => async dispatch => {
  try {
    await axios.put(`/api/adminPortal/allOrders/${order.id}`, order, {
      where: {id: order.id}
    })
    dispatch(changeOrder(order))
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
      return action.allOrders
    case CHANGE_ORDER:
      return [
        ...state.filter(order => order.id !== action.order.id),
        action.order
      ]
    case GET_USER_ORDERS:
      return action.userOrders
    default:
      return state
  }
}
