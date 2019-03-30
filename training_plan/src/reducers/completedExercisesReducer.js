import * as types from "../actions/actionTypes";

export default function completedExercisesReducer(state, action) {
    if (state === undefined) {
        return [];
    }

    switch(action.type) {
        case types.LOAD_COMPLETED_EXERCISES_SUCCESS:
            return action.completedExercises;
        default:
            return state;
    }
}