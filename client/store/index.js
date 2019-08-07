import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import shovels from './shovels'
import cart from './cart'
import singleShovel from './singleShovel'
import orders from './orders'
import allUsers from './usersAll'
import brands from './brands'

import reviews from './reviews'

const reducer = combineReducers({
  user,
  shovels,
  singleShovel,
  cart,
  orders,
  allUsers,
  reviews,
  brands
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
