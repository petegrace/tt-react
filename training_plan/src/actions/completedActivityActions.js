import { pendingTask, begin, end } from "react-redux-spinner";

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

export function loadWeeklyActivitySummary(startDate, endDate) {
    return function(dispatch) {
        dispatch({
            type: types.LOAD_WEEKLY_ACTIVITY_SUMMARY,
            [ pendingTask ]: begin
        });
        const api = new CompletedActivitiesApi();
        return api.getCompletedActivities(startDate, endDate, "summary").then(responseData => {
            if (responseData) {
                dispatch(loadWeeklyActivitySummarySuccess(responseData));
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

export function loadWeeklyActivitySummarySuccess(responseData) {
    return {
        type: types.LOAD_WEEKLY_ACTIVITY_SUMMARY_SUCCESS,
        [ pendingTask ]: end,
        activitySummary: responseData.activity_summary
    };
}