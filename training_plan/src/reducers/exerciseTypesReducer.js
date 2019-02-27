import * as types from "../actions/actionTypes";

export default function exerciseTypesReducer(state, action) {
    if (state === undefined) {
        return [];
    }

    switch(action.type) {
        case types.LOAD_EXERCISE_TYPES_SUCCESS:
            return action.exerciseTypes;
        default:
            return state;
    }
}