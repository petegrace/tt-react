import * as types from "./actionTypes";

export function loadCompletedExercisesSuccess(responseData) {
    return {
        type: types.LOAD_COMPLETED_EXERCISES_SUCCESS,
        completedExercises: responseData.completed_exercises
    };
}