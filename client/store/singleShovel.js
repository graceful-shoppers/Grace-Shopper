import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_SELECTED_SHOVEL = 'SET_SELECTED_SHOVEL'

/**
 * INITIAL STATE
 */
const selectedShovel = {}

/**
 * ACTION CREATORS
 */
const getSelectedShovel = shovel => ({type: SET_SELECTED_SHOVEL, shovel})

/**
 * THUNK CREATORS
 */
export const getShovel = shovelId => async dispatch => {
  try {
    const res = await axios.get(`/api/shovels/${shovelId}`)
    dispatch(getSelectedShovel(res.data))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function(state = selectedShovel, action) {
  switch (action.type) {
    case SET_SELECTED_SHOVEL:
      return action.shovel
    default:
      return state
  }
}
