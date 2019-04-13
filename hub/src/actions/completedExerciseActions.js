import { pendingTask, begin, end } from "react-redux-spinner";

import * as types from "./actionTypes";
import CompletedExercisesApi from "../api/CompletedExercisesApi";
import { showAlert } from "./alertActions";

export function loadCompletedExercisesSuccess(responseData) {
    return {
        type: types.LOAD_COMPLETED_EXERCISES_SUCCESS,
        completedExercises: responseData.completed_exercises
    };
}

export function addCompletedExercise(requestBody) {
    return function(dispatch) {
        dispatch({
            type: types.ADD_COMPLETED_EXERCISE,
            [ pendingTask ]: begin
        });

        const api = new CompletedExercisesApi();
        return api.postCompletedExercises(requestBody).then(responseData => {
            dispatch(addCompletedExerciseSuccess(responseData, dispatch));
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: end
            })
            throw(error);
        });
    }
}

export function addCompletedExerciseSuccess(responseData, dispatch) {
    const alertMessage = "Added " + responseData.exercise_name + ".";
    dispatch(showAlert(alertMessage));

    return {
        type: types.ADD_COMPLETED_EXERCISE_SUCCESS,
        [ pendingTask ]: end,
        addedId: responseData.id,
        addedExerciseName: responseData.exercise_name
    };
}