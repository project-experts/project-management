import  { REGISTER_CLICKED }  from './actionTypes'


const initialStore = {
   isRegClicked: false 
}


export const registerClicked = bool => {
   console.log(bool)
   return {
      type: REGISTER_CLICKED, 
      payload: bool
   }
}

export default function registerReducer (state=initialStore, action) {
   const { type, payload } = action; 
   switch(type) {
      case REGISTER_CLICKED : return {isRegClicked: payload }
      default: return state; 
   }
}