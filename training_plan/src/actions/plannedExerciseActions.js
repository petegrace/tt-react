import * as types from "./actionTypes";

export function loadPlannedExercisesSuccess(responseData) {
    return {
        type: types.LOAD_PLANNED_EXERCISES_SUCCESS,
        plannedExercises: responseData.planned_exercises
    };
}