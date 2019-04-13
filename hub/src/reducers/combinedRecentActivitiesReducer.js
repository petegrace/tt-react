import * as types from "../actions/actionTypes";

export default function combinedRecentActivitiesReducer(state, action) {
    if (state === undefined) {
        return {
            pageNo: 1,
            activitiesAndExercises: []
        }
    }

    switch(action.type) {
        case types.LOAD_COMBINED_RECENT_ACTIVITIES_SUCCESS:
            return {
                pageNo: action.pageNo,
                activitiesAndExercises: action.activitiesAndExercises
            };
        default:
            return state;
    }
}