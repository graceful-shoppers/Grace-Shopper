import axios from 'axios'
import {EDIT_SHOVEL} from './singleShovel'
/**
 * ACTION TYPES
 */

const GET_SHOVELS = 'GET_SHOVELS'
const GET_SHOVELS2 = 'GET_SHOVELS2'

const REMOVE_SHOVEL = 'REMOVE_SHOVEL'
const ADD_SHOVEL = 'ADD_SHOVEL'

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
const addShovel = shovel => ({type: ADD_SHOVEL, shovel})

/**
 * THUNK CREATORS
 */

export const getAllShovels2 = (title, type, sort, offset) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/shovels/get/${title}/${type}/${sort}/${offset}`
    )
    dispatch(getShovels2(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const getAllShovels = (title, type, sort, offset) => async dispatch => {
  try {
    const res = await axios.get(
      `/api/shovels/get/${title}/${type}/${sort}/${offset}`
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

export const postShovel = shovel => async dispatch => {
  try {
    const res = await axios.post(`/api/adminPortal/allShovels, ${shovel}`)
    const newShovel = res.data
    console.log(newShovel)
    dispatch(addShovel(newShovel))
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
    case ADD_SHOVEL:
      return [...state, action.shovel]
    default:
      return state
  }
}
