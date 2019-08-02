import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_SELECTED_SHOVEL = 'SET_SELECTED_SHOVEL'
export const EDIT_SHOVEL = 'EDIT_SHOVEL'

/**
 * INITIAL STATE
 */
const selectedShovel = {}

/**
 * ACTION CREATORS
 */
const getSelectedShovel = shovel => ({type: SET_SELECTED_SHOVEL, shovel})
const editShovel = shovel => ({type: EDIT_SHOVEL, shovel})
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

export const editSelectedShovel = shovel => async dispatch => {
  console.log('reaching')
  try {
    await axios.put(`/api/adminPortal/editShovel/${shovel.id}`, shovel, {
      where: {id: shovel.id}
    })
    dispatch(editShovel(shovel))
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
    case EDIT_SHOVEL:
      return action.shovel
    default:
      return state
  }
}
