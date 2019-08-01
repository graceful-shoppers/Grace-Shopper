import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'

/**
 * INITIAL STATE
 */
const reviews = []

/**
 * ACTION CREATORS
 */
const getReviews = allReviews => ({type: GET_REVIEWS, allReviews})

/**
 * THUNK CREATORS
 */
