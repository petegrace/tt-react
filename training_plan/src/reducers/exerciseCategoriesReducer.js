import * as types from "../actions/actionTypes";

export default function exerciseCategoriesReducer(state, action) {
    if (state === undefined) {
        return [];
    }

    switch(action.type) {
        case types.LOAD_EXERCISE_CATEGORIES_SUCCESS:
            return action.exerciseCategories;
        default:
            return state;
    }
}