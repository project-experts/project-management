import  {LOGIN_CLICKED}  from './actionTypes'


const initialStore = {
   isLoginClicked: false,
}


export const loginClicked = bool => {
   console.log(bool)
   return {
      type: LOGIN_CLICKED, 
      payload: bool
   }
}

export default function loginReducer (state=initialStore, action) {
   const { type, payload } = action; 
   switch(type) {
      case LOGIN_CLICKED : return {isLoginClicked: payload };
      default: return state; 
   }
}