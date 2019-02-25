import * as types from "./actionTypes";
import PlannedExerciseApi from "../api/PlannedExerciseApi";

export function loadPlannedExercisesSuccess(responseData) {
    return {
        type: types.LOAD_PLANNED_EXERCISES_SUCCESS,
        plannedExercises: responseData.planned_exercises
    };
}

export function deletePlannedExercise(id) {
    return function(dispatch) {
        const api = new PlannedExerciseApi();
        return api.deletePlannedExercise(id).then(result => {
            dispatch(deletePlannedExerciseSuccess(id));
        }).catch(error => {
            throw(error);
        });
    }
}

export function deletePlannedExerciseSuccess(id) {
    return {
        type: types.DELETE_PLANNED_EXERCISE_SUCCESS,
        deletedId: id
    };
}