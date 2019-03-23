import * as types from "./actionTypes";
import UserApi from "../api/UserApi";

export function loadUserInfo() {
    return function(dispatch) {
        const api = new UserApi();
        return api.getUserInfo().then(responseData => {
            if (responseData) {
                dispatch(loadUserInfoSuccess(responseData));
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadUserInfoSuccess(responseData) {
    return {
        type: types.LOAD_USER_INFO_SUCCESS,
        userInfo: responseData.user_info
    };
}