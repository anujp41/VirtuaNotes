import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import currentLocation from './current'
import markers from './markers'

const reducer = combineReducers({currentLocation, markers})
const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default store
export * from './current'
export * from './markers'