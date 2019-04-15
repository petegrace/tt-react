import * as types from "./actionTypes";

export function loadExerciseCategoriesSuccess(responseData) {
    return {
        type: types.LOAD_EXERCISE_CATEGORIES_SUCCESS,
        exerciseCategories: responseData.exercise_categories
    };
}