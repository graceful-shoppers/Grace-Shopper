import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_BRANDS = 'GET_BRANDS'

/**
 * INITIAL STATE
 */
const brands = []

/**
 * ACTION CREATORS
 */
const getBrands = brands => ({type: GET_BRANDS, brands})

/**
 * THUNK CREATORS
 */

export const getBrandsThunk = () => {
  return async dispatch => {
    const brands = await axios.get(`/api/shovels/brands`)
    dispatch(getBrands(brands.data))
  }
}

/**
 * REDUCER
 */
export default function(state = brands, action) {
  switch (action.type) {
    case GET_BRANDS:
      return action.brands
    default:
      return state
  }
}
