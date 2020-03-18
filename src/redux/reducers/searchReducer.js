import { UPDATE_STATE } from './actionTypes'

const initialState = {
   searchInput: ''
}


export const filterState = searchValue => {
   return {
      type: UPDATE_STATE, 
      payload: searchValue
   }
}


export default function searchReducer ( state = initialState, action ) {
   const { type, payload } = action
   switch(type) {
      case UPDATE_STATE : return { ...state, searchInput: payload }
      default : return state; 
   }
}