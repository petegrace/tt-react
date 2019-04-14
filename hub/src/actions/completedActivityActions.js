import { pendingTask, begin, end } from "react-redux-spinner";

import * as types from "./actionTypes";
import CompletedActivitiesApi from "../api/CompletedActivitiesApi";
import { loadCompletedExercisesSuccess } from "./completedExerciseActions";
import { showAlert } from "./alertActions";

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
                [ pendingTask ]: end
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

export function addCompletedActivities(requestBody) {
    return function(dispatch) {
        dispatch({
            type: types.ADD_COMPLETED_ACTIVITIES,
            [ pendingTask ]: begin
        });

        const api = new CompletedActivitiesApi();
        return api.postCompletedActivities(requestBody).then(responseData => {
            dispatch(addCompletedActivitiesSuccess(responseData, dispatch));
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: end
            })
            throw(error);
        });
    }
}

export function addCompletedActivitiesSuccess(responseData, dispatch) {
    // for now we'll just use the 1st message as the alert but we can develop a means to show all of them in future
    const alertMessage = responseData.messages[0];
    dispatch(showAlert(alertMessage));

    return {
        type: types.ADD_COMPLETED_ACTIVITIES_SUCCESS,
        [ pendingTask ]: end
    };
}