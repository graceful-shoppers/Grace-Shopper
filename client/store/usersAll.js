import axios from 'axios'
/**
 * ACTION TYPES
 */

const GET_ALL_USERS = 'GET_ALL_USERS'
const DELETE_USER = 'DELETE_USER'

/**
 * INITIAL STATE
 */
const allUsers = []

/**
 * ACTION CREATORS
 */
const getManyUsers = users => ({type: GET_ALL_USERS, users})
const removeUser = userId => ({type: DELETE_USER, userId})
/**
 * THUNK CREATORS
 */
export const getAllUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(getManyUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/adminPortal/allUsers/${userId}`)
    dispatch(removeUser(userId))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = allUsers, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case DELETE_USER:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
