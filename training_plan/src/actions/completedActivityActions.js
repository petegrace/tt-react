import * as types from "./actionTypes";
import CompletedActivitiesApi from "../api/CompletedActivitiesApi";
// TODO: import { loadCompletedExercisesSuccess } from "./completedExerciseActions";

export function loadCompletedActivities(startDate, endDate) {
    return function(dispatch) {
        const api = new CompletedActivitiesApi();
        return api.getCompletedActivities(startDate, endDate).then(responseData => {
            if (responseData) {
                dispatch(loadCompletedActivitiesSuccess(responseData));
                // TODO: dispatch(loadCompletedExercisesSuccess(responseData))
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadCompletedActivitiesSuccess(responseData) {
    console.log(responseData.completed_activities);
    return {
        type: types.LOAD_COMPLETED_ACTIVITIES_SUCCESS,
        completedActivities: responseData.completed_activities
    };
}