import * as types from "../actions/actionTypes";

export default function trainingPlanTemplatesReducer(state, action) {
    if (state === undefined) {
        return [];
    }

    switch(action.type) {
        case types.LOAD_TRAINING_PLAN_TEMPLATES_SUCCESS:
            return action.trainingPlanTemplates;
        default:
            return state;
    }
}