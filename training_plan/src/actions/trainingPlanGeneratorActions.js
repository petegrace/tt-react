import { pendingTask, begin, end } from "react-redux-spinner";

import * as types from "./actionTypes";
import TrainingPlanGeneratorApi from "../api/TrainingPlanGeneratorApi";

export function loadTrainingPlanGeneratorInputs(targetRaceDistance, targetRaceDate) {
    return function(dispatch) {
        dispatch({
            type: types.LOAD_TRAINING_PLAN_GENERATOR_INPUTS,
            [ pendingTask ]: begin
        });
        const api = new TrainingPlanGeneratorApi();
        return api.getTrainingPlanGenerator(targetRaceDistance, targetRaceDate).then(responseData => {
            if (responseData) {
                dispatch(loadTrainingPlanGeneratorInputsSuccess(responseData));
            }
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: end
            });
            throw(error);
        });
    }
}

export function loadTrainingPlanGeneratorInputsSuccess(responseData) {
    return {
        type: types.LOAD_TRAINING_PLAN_GENERATOR_INPUTS_SUCCESS,
        [ pendingTask ]: end,
        trainingPlanGeneratorInputs: responseData.training_plan_generator_inputs
    };
}