import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import loginReducer from './reducers/loginReducer'
import sidebarReducer from './reducers/sidebarReducer'


const rootReducer = combineReducers({
   loginReducer,
   sidebarReducer,
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))