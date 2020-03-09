import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
   loginReducer,
   userReducer,
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))