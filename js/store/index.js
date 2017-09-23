import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import currentLocation from './current'
import markers from './markers'
import distanceArr from './distance'

const reducer = combineReducers({currentLocation, markers, distanceArr})
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default store
export * from './current'
export * from './markers'
export * from './distance'