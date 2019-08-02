import axios from 'axios'
import {EDIT_SHOVEL} from './singleShovel'
/**
 * ACTION TYPES
 */

const GET_SHOVELS = 'GET_SHOVELS'
const REMOVE_SHOVEL = 'REMOVE_SHOVEL'

/**
 * INITIAL STATE
 */
const defaultShovels = []

/**
 * ACTION CREATORS
 */
const getShovels = shovels => ({type: GET_SHOVELS, shovels})
const removeShovel = shovelId => ({type: REMOVE_SHOVEL, shovelId})

/**
 * THUNK CREATORS
 */
export const getAllShovels = type => async dispatch => {
  try {
    const res = await axios.get(`/api/shovels/get/${type}`)
    dispatch(getShovels(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteShovel = shovelId => async dispatch => {
  try {
    await axios.delete(`/api/adminPortal/shovels/${shovelId}`)
    dispatch(removeShovel(shovelId))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = defaultShovels, action) {
  switch (action.type) {
    case GET_SHOVELS:
      return action.shovels
    case REMOVE_SHOVEL:
      return state.filter(shovel => shovel.id !== action.shovelId)
    case EDIT_SHOVEL:
      return [...state, action.shovel]
    default:
      return state
  }
}
