import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import loginReducer from './reducers/loginReducer'

const rootReducer = combineReducers({
   loginReducer,
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))