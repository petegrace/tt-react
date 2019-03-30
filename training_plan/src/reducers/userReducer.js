import * as types from "../actions/actionTypes";

export default function userReducer(state, action) {
    if (state === undefined) {
        return [];
    }

    switch(action.type) {
        case types.LOAD_USER_INFO_SUCCESS:
            return action.userInfo;
        default:
            return state;
    }
}