import axios from 'axios'
import {EDIT_SHOVEL} from './singleShovel'
/**
 * ACTION TYPES
 */

const GET_SHOVELS = 'GET_SHOVELS'
const GET_SHOVELS2 = 'GET_SHOVELS2'

const REMOVE_SHOVEL = 'REMOVE_SHOVEL'

/**
 * INITIAL STATE
 */
const defaultShovels = []

/**
 * ACTION CREATORS
 */
const getShovels = shovels => ({type: GET_SHOVELS, shovels})
const getShovels2 = shovels => ({type: GET_SHOVELS2, shovels})

const removeShovel = shovelId => ({type: REMOVE_SHOVEL, shovelId})

/**
 * THUNK CREATORS
 */

export const getAllShovels2 = (
  title,
  type,
  sort,
  offset,
  brand
) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/shovels/get/${title}/${type}/${sort}/${offset}/${brand}`
    )
    dispatch(getShovels2(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllShovels = (
  title,
  type,
  sort,
  offset,
  brand
) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/shovels/get/${title}/${type}/${sort}/${offset}/${brand}`
    )
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
    case GET_SHOVELS2:
      return action.shovels
    case GET_SHOVELS:
      return state.concat(action.shovels)
    case REMOVE_SHOVEL:
      return state.filter(shovel => shovel.id !== action.shovelId)
    case EDIT_SHOVEL:
      return [...state, action.shovel]
    default:
      return state
  }
}
