import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import sidebarReducer from './reducers/sidebarReducer'

const rootReducer = combineReducers({
   loginReducer,
   userReducer,
   sidebarReducer
})



export default createStore(rootReducer, applyMiddleware(promiseMiddleware))