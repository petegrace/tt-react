import { pendingTask, begin, end } from "react-redux-spinner";

import * as types from "./actionTypes";
import PlannedActivitiesApi from "../api/PlannedActivitiesApi";
import PlannedActivityApi from "../api/PlannedActivityApi";
import { loadPlannedRacesSuccess } from "./plannedRaceActions";
import { loadPlannedExercisesSuccess } from "./plannedExerciseActions";

export function loadPlannedActivities(startDate, endDate) {
    return function(dispatch) {
        dispatch({
            type: types.LOAD_PLANNED_ACTIVITIES,
            [ pendingTask ]: begin
        });
        const api = new PlannedActivitiesApi();
        return api.getPlannedActivities(startDate, endDate).then(responseData => {
            if (responseData) {
                dispatch(loadPlannedActivitiesSuccess(responseData));
                dispatch(loadPlannedRacesSuccess(responseData));
                dispatch(loadPlannedExercisesSuccess(responseData));
            }
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: end
            })
            throw(error);
        });
    }
}

export function loadPlannedActivitiesSuccess(responseData) {
    return {
        type: types.LOAD_PLANNED_ACTIVITIES_SUCCESS,
        [ pendingTask ]: end,
        plannedActivities: responseData.planned_activities
    };
}

export function addPlannedActivity(requestBody) {
    return function(dispatch) {
        const api = new PlannedActivitiesApi();
        return api.postPlannedActivities(requestBody).then(responseData => {
            dispatch(addPlannedActivitySuccess(responseData));
        }).catch(error => {
            throw(error);
        });
    }
}

export function addPlannedActivitySuccess(responseData) {
    return {
        type: types.ADD_PLANNED_ACTIVITY_SUCCESS,
        addedId: responseData.id
    };
}

export function updatePlannedActivity(id, requestBody) {
    return function(dispatch) {
        const api = new PlannedActivityApi();
        return api.patchPlannedActivity(id, requestBody).then(result => {
            dispatch(updatePlannedActivitySuccess(id));
        }).catch(error => {
            throw(error);
        });
    }
}

export function updatePlannedActivitySuccess(id) {
    return {
        type: types.UPDATE_PLANNED_ACTIVITY_SUCCESS,
        updatedId: id
    };
}

export function deletePlannedActivity(id, scope) {
    return function(dispatch) {
        const api = new PlannedActivityApi();
        return api.deletePlannedActivity(id, scope).then(result => {
            dispatch(deletePlannedActivitySuccess(id, scope));
        }).catch(error => {
            throw(error);
        });
    }
}

export function deletePlannedActivitySuccess(id, scope) {
    return {
        type: types.DELETE_PLANNED_ACTIVITY_SUCCESS,
        deletedId: id,
        scope: scope
    };
}