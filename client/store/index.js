import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import shovels from './shovels'
import cart from './cart'
import singleShovel from './singleShovel'
import myAccountOrders from './myAccountOrders'

import reviews from './reviews'


const reducer = combineReducers({
  user,
  shovels,
  singleShovel,
  cart,
  myAccountOrders,
  reviews
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store
export * from './user'
