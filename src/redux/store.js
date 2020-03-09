
import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

const rootReducer = combineReducers({

})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware))