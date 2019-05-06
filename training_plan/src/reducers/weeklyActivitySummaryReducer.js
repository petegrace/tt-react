import * as types from "../actions/actionTypes";

export default function weeklyActivitySummaryReducer(state, action) {
    if (state === undefined) {
        return [];
    }

    switch(action.type) {
        case types.LOAD_WEEKLY_ACTIVITY_SUMMARY_SUCCESS:
            return action.activitySummary;
        default:
            return state;
    }
}