import * as types from "../actions/actionTypes";

export default function plannedExercisesReducer(state, action) {
    if (state === undefined) {
        return [];
    }

    switch(action.type) {
        case types.LOAD_PLANNED_EXERCISES_SUCCESS:
            return action.plannedExercises;
        default:
            return state;
    }
}