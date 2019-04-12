import { pendingTask, begin, end, endAll } from "react-redux-spinner";

import * as types from "./actionTypes";
import PlannedRacesApi from "../api/PlannedRacesApi";
import PlannedRaceApi from "../api/PlannedRaceApi";

export function loadPlannedRacesSuccess(responseData) {
    return {
        type: types.LOAD_PLANNED_RACES_SUCCESS,
        plannedRaces: responseData.planned_races
    };
}

export function addPlannedRace(requestBody) {
    return function(dispatch) {
        dispatch({
            type: types.ADD_PLANNED_RACE,
            [ pendingTask ]: begin
        });
        const api = new PlannedRacesApi();
        return api.postPlannedRaces(requestBody).then(responseData => {
            dispatch(addPlannedRaceSuccess(responseData));
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: endAll
            });
            throw(error);
        });
    }
}

export function addPlannedRaceSuccess(responseData) {
    return {
        type: types.ADD_PLANNED_RACE_SUCCESS,
        [ pendingTask ]: end,
        addedId: responseData.id
    };
}

export function updatePlannedRace(id, requestBody) {
    return function(dispatch) {
        dispatch({
            type: types.UPDATE_PLANNED_RACE,
            [ pendingTask ]: begin
        });
        const api = new PlannedRaceApi();
        return api.patchPlannedRace(id, requestBody).then(result => {
            dispatch(updatePlannedRaceSuccess(id));
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: endAll
            });
            throw(error);
        });
    }
}

export function updatePlannedRaceSuccess(id) {
    return {
        type: types.UPDATE_PLANNED_RACE_SUCCESS,
        [ pendingTask ]: end,
        updatedId: id
    };
}

export function deletePlannedRace(id) {
    return function(dispatch) {
        dispatch({
            type: types.DELETE_PLANNED_RACE,
            [ pendingTask ]: begin
        });
        const api = new PlannedRaceApi();
        return api.deletePlannedRace(id).then(result => {
            dispatch(deletePlannedRaceSuccess(id));
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: endAll
            });
            throw(error);
        });
    }
}

export function deletePlannedRaceSuccess(id) {
    return {
        type: types.DELETE_PLANNED_RACE_SUCCESS,
        [ pendingTask ]: end,
        deletedId: id
    };
}