import { UserActionTypes } from './user-types'

const INITIAL_STATE = {
    currentUser: null
}

//know that you reducer should have 2 properties passed 1) state before action was fired
// 2) action object with 2 properties(type of action and payload value)
const userReducer = (state = INITIAL_STATE, action ) => {
    switch(action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        default:
            return state;

    };
} 

export default userReducer;