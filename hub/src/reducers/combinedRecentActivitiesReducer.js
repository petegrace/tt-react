import * as types from "../actions/actionTypes";

export default function combinedRecentActivitiesReducer(state, action) {
    if (state === undefined) {
        return {
            pageNo: null,
            prevPageNo: null,
            nextPageNo: 1,
            activitiesAndExercises: []
        }
    }

    switch(action.type) {
        case types.LOAD_COMBINED_RECENT_ACTIVITIES_SUCCESS:
            return {
                pageNo: action.pageNo,
                prevPageNo: action.prevPageNo,
                nextPageNo: action.nextPageNo,
                activitiesAndExercises: action.activitiesAndExercises
            };
        default:
            return state;
    }
}