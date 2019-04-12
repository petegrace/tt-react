import { pendingTask, begin, end, endAll } from "react-redux-spinner";

import * as types from "./actionTypes";
import CompletedActivitiesApi from "../api/CompletedActivitiesApi";
import { loadCompletedExercisesSuccess } from "./completedExerciseActions";

export function loadCompletedActivities(startDate, endDate) {
    return function(dispatch) {
        dispatch({
            type: types.LOAD_COMPLETED_ACTIVITIES,
            [ pendingTask ]: begin
        });
        const api = new CompletedActivitiesApi();
        return api.getCompletedActivities(startDate, endDate).then(responseData => {
            if (responseData) {
                dispatch(loadCompletedActivitiesSuccess(responseData));
                dispatch(loadCompletedExercisesSuccess(responseData));
            }
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: endAll
            });
            throw(error);
        });
    }
}

export function loadCompletedActivitiesSuccess(responseData) {
    return {
        type: types.LOAD_COMPLETED_ACTIVITIES_SUCCESS,
        [ pendingTask ]: end,
        completedActivities: responseData.completed_activities
    };
}