import * as types from "./actionTypes";
import ActivityTypesApi from "../api/ActivityTypesApi";

export function loadActivityTypes() {
    return function(dispatch) {
        const api = new ActivityTypesApi();
        return api.getActivityTypes().then(responseData => {
            dispatch(loadActivityTypesSuccess(responseData));
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadActivityTypesSuccess(responseData) {
    return {
        type: types.LOAD_ACTIVITY_TYPES_SUCCESS,
        activityTypes: responseData.activity_types
    };
}