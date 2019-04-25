import * as types from "../actions/actionTypes";

export default function trainingPlanGeneratorInputsReducer(state, action) {
    if (state === undefined) {
        return null;
    }

    switch(action.type) {
        case types.LOAD_TRAINING_PLAN_GENERATOR_INPUTS_SUCCESS:
            return action.trainingPlanGeneratorInputs;
        default:
            return state;
    }
}