import * as types from "./actionTypes";
import TrainingPlanTemplatesApi from "../api/TrainingPlanTemplatesApi";

export function loadTrainingPlanTemplates() {
    return function(dispatch) {
        const api = new TrainingPlanTemplatesApi();
        return api.getTrainingPlanTemplates().then(responseData => {
            if (responseData) {
                dispatch(loadTrainingPlanTemplatesSuccess(responseData));
            }
        }).catch(error => {
            throw(error);
        });
    }
}

export function loadTrainingPlanTemplatesSuccess(responseData) {
    return {
        type: types.LOAD_TRAINING_PLAN_TEMPLATES_SUCCESS,
        trainingPlanTemplates: responseData.training_plan_templates
    };
}