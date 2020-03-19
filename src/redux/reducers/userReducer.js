import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes'

const initialState = {
   user: {}
}

export const userLoggedIn = user => {
   console.log('User reducer', user)
   return {
      type: USER_LOGGED_IN, 
      payload: user
   }
}


export const userLoggedOut = () => {
   return {
      type: USER_LOGGED_OUT, 
      payload: {}
   }
}

export default function userReducer(state = initialState, action) {
   const { type, payload } = action; 
   switch(type) {
      case USER_LOGGED_IN : return {...state, user: payload }; 
      case USER_LOGGED_OUT : return {...state, user: {}}; 
      default: return state; 
   }
}



