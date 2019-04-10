import * as types from "../actions/actionTypes";

export default function userReducer(state, action) {
    if (state === undefined) {
        return null;
    }

    switch(action.type) {
        case types.LOAD_USER_INFO_SUCCESS:
            return action.userInfo;
        case types.UPDATE_USER_INFO_SUCCESS:
            return action.updatedUserInfo;
        default:
            return state;
    }
}