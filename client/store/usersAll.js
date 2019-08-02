import axios from 'axios'
/**
 * ACTION TYPES
 */

const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const allUsers = []

/**
 * ACTION CREATORS
 */
const getManyUsers = users => ({type: GET_ALL_USERS, users})
const removeUser = userId => ({type: REMOVE_USER, userId})
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
    await axios.delete(`/api/usersAll/${userId}`)
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
    case REMOVE_USER:
      return state.filter(user => user.id !== action.userId)
    default:
      return state
  }
}
