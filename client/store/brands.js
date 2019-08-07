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
    var res = await axios.get(`/api/shovels/brands`)

    var brands = res.data

    var uniqueBrands = []
    for (let i = 0; i < brands.length; i++) {
      if (!uniqueBrands.includes(brands[i].brand)) {
        uniqueBrands.push(brands[i].brand)
      }
    }

    dispatch(getBrands(uniqueBrands))
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
