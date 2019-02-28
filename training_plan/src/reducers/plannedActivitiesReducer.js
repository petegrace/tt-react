import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function plannedActivitiesReducer(state = initialState.plannedActivities, action) {
    switch(action.type) {
        case types.LOAD_PLANNED_ACTIVITIES_SUCCESS:
            return action.plannedActivities;
        // todo: doesn't handle single-date scope at present
        // case types.DELETE_PLANNED_ACTIVITY_SUCCESS:
        //     const remainingActivities = state.filter(function(plannedActivity) {
        //         return plannedActivity.id !== action.deletedId;
        //     });
        //     return remainingActivities;
        // TODO: proper reducer for adds and updates so that we can avoid the refresh to update state.  Probably more easy to think about once our data model allows for one-offs?
        default:
            return state;
    }
}