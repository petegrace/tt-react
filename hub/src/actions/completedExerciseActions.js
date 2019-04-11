import * as types from "./actionTypes";
import CompletedExercisesApi from "../api/CompletedExercisesApi";

export function loadCompletedExercisesSuccess(responseData) {
    return {
        type: types.LOAD_COMPLETED_EXERCISES_SUCCESS,
        completedExercises: responseData.completed_exercises
    };
}

export function addCompletedExercise(requestBody) {
    return function(dispatch) {
        const api = new CompletedExercisesApi();
        return api.postCompletedExercises(requestBody).then(responseData => {
            dispatch(addCompletedExerciseSuccess(responseData));
        }).catch(error => {
            throw(error);
        });
    }
}

export function addCompletedExerciseSuccess(responseData) {
    return {
        type: types.ADD_COMPLETED_EXERCISE_SUCCESS,
        addedId: responseData.id
    };
}