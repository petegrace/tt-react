import * as types from "./actionTypes";
import TrainingPlanTemplatesApi from "../api/TrainingPlanTemplatesApi";
import PlannedExercisesApi from "../api/PlannedExercisesApi";

export function loadTrainingPlanTemplates() {
    return function(dispatch) {
        const api = new TrainingPlanTemplatesApi();
        return api.getTrainingPlanTemplates().then(responseData => {
            if (responseData.ok) {
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

export function copyTrainingPlanTemplate(templateId) {
    const requestBody = JSON.stringify({
        template_id: templateId
    });
    return function(dispatch) {
        const api = new PlannedExercisesApi();
        return api.postPlannedExercises(requestBody).then(responseData => {
            dispatch(copyTrainingPlanTemplateSuccess(responseData));
        }).catch(error => {
            throw(error);
        });
    }
}

export function copyTrainingPlanTemplateSuccess(responseData) {
    return {
        type: types.COPY_TRAINING_PLAN_TEMPLATE_SUCCESS,
        message: responseData.message
    };
}