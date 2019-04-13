import { pendingTask, begin, end } from "react-redux-spinner";

import * as types from "./actionTypes";
import CompletedActivitiesApi from "../api/CompletedActivitiesApi";

export function loadCombinedRecentActivities(pageNo, pageSize) {
    return function(dispatch) {
        dispatch({
            type: types.LOAD_COMBINED_RECENT_ACTIVITIES,
            [ pendingTask ]: begin
        });
        const api = new CompletedActivitiesApi();
        const combineExercises = true;
        return api.getRecentActivities(pageNo, pageSize, combineExercises).then(responseData => {
            if (responseData) {
                dispatch(loadCombinedRecentActivitiesSuccess(responseData));
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

export function loadCombinedRecentActivitiesSuccess(responseData) {
    return {
        type: types.LOAD_COMBINED_RECENT_ACTIVITIES_SUCCESS,
        [ pendingTask ]: end,
        pageNo: responseData.page_no,
        activitiesAndExercises: responseData.activities_and_exercises
    };
}