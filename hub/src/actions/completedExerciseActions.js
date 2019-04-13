import { pendingTask, begin, end } from "react-redux-spinner";
import { format } from "date-fns";

import * as types from "./actionTypes";
import CompletedExercisesApi from "../api/CompletedExercisesApi";
import CompletedExerciseApi from "../api/CompletedExerciseApi";
import { showAlert } from "./alertActions";

export function loadCompletedExercisesSuccess(responseData) {
    return {
        type: types.LOAD_COMPLETED_EXERCISES_SUCCESS,
        completedExercises: responseData.completed_exercises
    };
}

function dispatchCompletedExerciseAlert(operation, responseData, dispatch) {
    const alertMessage = operation + " " + responseData.exercise_name + ".";
    const actionLinkText = "Edit";
    const actionFormInitData = {
        id: responseData.id,
        exercise_name: responseData.exercise_name,
        exercise_datetime: format(new Date(responseData.exercise_datetime), "ddd DD MMM HH:mm:ss"),
        measured_by: responseData.measured_by,
        reps: responseData.reps,
        seconds: responseData.seconds
    };
    dispatch(showAlert(alertMessage, actionLinkText, actionFormInitData));
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
    dispatchCompletedExerciseAlert("Added", responseData, dispatch);

    return {
        type: types.ADD_COMPLETED_EXERCISE_SUCCESS,
        [ pendingTask ]: end,
        addedId: responseData.id,
        addedExerciseName: responseData.exercise_name
    };
}

export function updateCompletedExercise(id, requestBody) {    
    return function(dispatch) {
        dispatch({
            type: types.UPDATE_COMPLETED_EXERCISE,
            [ pendingTask ]: begin
        });
        const api = new CompletedExerciseApi();
        return api.patchCompletedExercise(id, requestBody).then(responseData => {
            dispatch(updateCompletedExerciseSuccess(responseData, dispatch));
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: end
            });
            throw(error);
        });
    }
}

export function updateCompletedExerciseSuccess(responseData, dispatch) {
    dispatchCompletedExerciseAlert("Updated", responseData, dispatch);

    return {
        type: types.UPDATE_COMPLETED_EXERCISE_SUCCESS,
        [ pendingTask ]: end,
        updatedId: responseData.id
    };
}