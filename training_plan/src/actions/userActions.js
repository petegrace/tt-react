import { pendingTask, begin, end } from "react-redux-spinner";

import * as types from "./actionTypes";
import UserApi from "../api/UserApi";

export function loadUserInfo() {
    return function(dispatch) {
        dispatch({
            type: types.LOAD_USER_INFO,
            [ pendingTask ]: begin
        });
        const api = new UserApi();
        return api.getUserInfo().then(responseData => {
            if (responseData) {
                dispatch(loadUserInfoSuccess(responseData));
            }
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: end
            });
            throw(error);
        });
    }
}

export function loadUserInfoSuccess(responseData) {
    return {
        type: types.LOAD_USER_INFO_SUCCESS,
        [ pendingTask ]: end,
        userInfo: responseData.user_info
    };
}

export function updateUserInfo(id, requestBody) {
    return function(dispatch) {
        dispatch({
            type: types.UPDATE_USER_INFO,
            [ pendingTask ]: begin
        });
        const api = new UserApi();
        return api.patchUserInfo(id, requestBody).then(responseData => {
            if (responseData) {
                dispatch(updateUserInfoSuccess(id, responseData));
            }
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: end
            });
            throw(error);
        });
    }
}

export function updateUserInfoSuccess(id, responseData) {
    return {
        type: types.UPDATE_USER_INFO_SUCCESS,
        [ pendingTask ]: end,
        updatedId: id,
        updatedUserInfo: responseData.updated_user_info
    };
}