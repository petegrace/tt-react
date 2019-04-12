import { pendingTask, begin, end, endAll } from "react-redux-spinner";

import * as types from "./actionTypes";
import PlannedExerciseApi from "../api/PlannedExerciseApi";
import PlannedExercisesApi from "../api/PlannedExercisesApi";

export function loadPlannedExercisesSuccess(responseData) {
    return {
        type: types.LOAD_PLANNED_EXERCISES_SUCCESS,
        plannedExercises: responseData.planned_exercises
    };
}

export function addPlannedExercise(requestBody) {
    return function(dispatch) {
        dispatch({
            type: types.ADD_PLANNED_EXERCISE,
            [ pendingTask ]: begin
        });
        const api = new PlannedExercisesApi();
        return api.postPlannedExercises(requestBody).then(responseData => {
            dispatch(addPlannedExerciseSuccess(responseData));
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: endAll
            });
            throw(error);
        });
    }
}

export function addPlannedExerciseSuccess(responseData) {
    return {
        type: types.ADD_PLANNED_EXERCISE_SUCCESS,
        [ pendingTask ]: end,
        addedId: responseData.id
    };
}

export function updatePlannedExercise(id, requestBody) {
    return function(dispatch) {
        dispatch({
            type: types.UPDATE_PLANNED_EXERCISE,
            [ pendingTask ]: begin
        });
        const api = new PlannedExerciseApi();
        return api.patchPlannedExercise(id, requestBody).then(result => {
            dispatch(updatePlannedExerciseSuccess(id));
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: endAll
            });
            throw(error);
        });
    }
}

export function updatePlannedExerciseSuccess(id) {
    return {
        type: types.UPDATE_PLANNED_EXERCISE_SUCCESS,
        [ pendingTask ]: end,
        updatedId: id
    };
}

export function deletePlannedExercise(id, scope) {
    return function(dispatch) {
        dispatch({
            type: types.DELETE_PLANNED_EXERCISE,
            [ pendingTask ]: begin
        });
        const api = new PlannedExerciseApi();
        return api.deletePlannedExercise(id, scope).then(result => {
            dispatch(deletePlannedExerciseSuccess(id));
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: endAll
            });
            throw(error);
        });
    }
}

export function deletePlannedExerciseSuccess(id, scope) {
    return {
        type: types.DELETE_PLANNED_EXERCISE_SUCCESS,
        [ pendingTask ]: end,
        deletedId: id,
        scope: scope
    };
}