import { pendingTask, begin, end } from "react-redux-spinner";

import * as types from "./actionTypes";
import ActivityTypesApi from "../api/ActivityTypesApi";
import { loadExerciseTypesSuccess } from "./exerciseTypeActions"
import { loadExerciseCategoriesSuccess } from "./exerciseCategoryActions"

export function loadActivityTypes() {
    return function(dispatch) {
        dispatch({
            type: types.LOAD_ACTIVITY_TYPES,
            [ pendingTask ]: begin
        });
        const api = new ActivityTypesApi();
        return api.getActivityTypes().then(responseData => {
            if (responseData) {
                dispatch(loadActivityTypesSuccess(responseData));
                dispatch(loadExerciseTypesSuccess(responseData));
                dispatch(loadExerciseCategoriesSuccess(responseData));
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

export function loadActivityTypesSuccess(responseData) {
    return {
        type: types.LOAD_ACTIVITY_TYPES_SUCCESS,
        [ pendingTask ]: end,
        activityTypes: responseData.activity_types
    };
}