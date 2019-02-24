import * as types from "../actions/actionTypes";

export default function activityTypesReducer(state, action) {
    if (state === undefined) {
        return { activityTypes: [] };
    }

    switch(action.type) {
        case types.LOAD_ACTIVITY_TYPES_SUCCESS:
            console.log("IN LOAD_ACTIVITY_TYPES_SUCCESS with " + action.activityTypes)
            return action.activityTypes;
        default:
            return state;
    }
}