import * as types from "../actions/actionTypes";

export default function plannedExercisesReducer(state, action) {
    if (state === undefined) {
        return [];
    }

    switch(action.type) {
        case types.LOAD_PLANNED_EXERCISES_SUCCESS:
            return action.plannedExercises;
        case types.DELETE_PLANNED_EXERCISE_SUCCESS:
            let remainingPlannedExerciseCategories = []
            let remainingExercises;
            for (let plannedExerciseCategory of state) {
                remainingExercises = plannedExerciseCategory.exercises.filter(function(plannedExercise) {
                    return plannedExercise.id !== action.deletedId;
                });
                if (remainingExercises.length > 0) {
                    plannedExerciseCategory.exercises = remainingExercises;
                    remainingPlannedExerciseCategories.push(plannedExerciseCategory);
                }
            }
            return remainingPlannedExerciseCategories;
        // todo: proper reducers for update and create that avoid the need to refresh
        default:
            return state;
    }
}