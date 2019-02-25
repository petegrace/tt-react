import * as types from "./actionTypes";
import PlannedActivitiesApi from "../api/PlannedActivitiesApi";
import PlannedActivityApi from "../api/PlannedActivityApi";

export function loadPlannedActivities(startDate, endDate) {
    return function(dispatch) {
        const api = new PlannedActivitiesApi();
        return api.getPlannedActivities(startDate, endDate).then(responseData => {
            if (responseData) {
                dispatch(loadPlannedActivitiesSuccess(responseData));
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadPlannedActivitiesSuccess(responseData) {
    return {
        type: types.LOAD_PLANNED_ACTIVITIES_SUCCESS,
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

export function deletePlannedActivity(id) {
    return function(dispatch) {
        const api = new PlannedActivityApi();
        return api.deletePlannedActivity(id).then(result => {
            dispatch(deletePlannedActivitySuccess(id));
        }).catch(error => {
            throw(error);
        });
    }
}

export function deletePlannedActivitySuccess(id) {
    return {
        type: types.DELETE_PLANNED_ACTIVITY_SUCCESS,
        deletedId: id
    };
}