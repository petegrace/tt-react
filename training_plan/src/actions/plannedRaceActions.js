import * as types from "./actionTypes";
import PlannedRacesApi from "../api/PlannedRacesApi";

export function loadPlannedRacesSuccess(responseData) {
    return {
        type: types.LOAD_PLANNED_RACES_SUCCESS,
        plannedRaces: responseData.planned_races
    };
}

export function addPlannedRace(requestBody) {
    return function(dispatch) {
        const api = new PlannedRacesApi();
        return api.postPlannedRaces(requestBody).then(responseData => {
            dispatch(addPlannedRaceSuccess(responseData));
        }).catch(error => {
            throw(error);
        });
    }
}

export function addPlannedRaceSuccess(responseData) {
    return {
        type: types.ADD_PLANNED_RACE_SUCCESS,
        addedId: responseData.id
    };
}