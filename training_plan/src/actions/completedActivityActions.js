import * as types from "./actionTypes";
import CompletedActivitiesApi from "../api/CompletedActivitiesApi";
import { loadCompletedExercisesSuccess } from "./completedExerciseActions";

export function loadCompletedActivities(startDate, endDate) {
    return function(dispatch) {
        const api = new CompletedActivitiesApi();
        return api.getCompletedActivities(startDate, endDate).then(responseData => {
            if (responseData) {
                dispatch(loadCompletedActivitiesSuccess(responseData));
                dispatch(loadCompletedExercisesSuccess(responseData));
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadCompletedActivitiesSuccess(responseData) {
    return {
        type: types.LOAD_COMPLETED_ACTIVITIES_SUCCESS,
        completedActivities: responseData.completed_activities
    };
}