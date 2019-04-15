import * as types from "./actionTypes";

export function loadExerciseTypesSuccess(responseData) {
    return {
        type: types.LOAD_EXERCISE_TYPES_SUCCESS,
        exerciseTypes: responseData.exercise_types
    };
}