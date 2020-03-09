const initialState = {
    toggleSideBar: true
}

const SIDEBAR_TOGGLE = 'SIDEBAR_TOGGLE'
export function sidebarToggle(sidebar) {
    console.log(sidebar)
    return {
        type: SIDEBAR_TOGGLE,
        payload: sidebar
    }
}
export default function sidebarReducer (state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case SIDEBAR_TOGGLE:
            return{toggleSideBar: payload}
        default: 
            return state
    }
}