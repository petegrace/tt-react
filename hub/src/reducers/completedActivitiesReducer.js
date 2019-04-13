import * as types from "../actions/actionTypes";

export default function completedActivitiesReducer(state, action) {
    if (state === undefined) {
        return [];
    }

    switch(action.type) {
        case types.LOAD_COMPLETED_ACTIVITIES_SUCCESS:
            return action.completedActivities;
        default:
            return state;
    }
}