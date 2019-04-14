import * as types from "../actions/actionTypes";

export default function userReducer(state, action) {
    if (state === undefined) {
        return null;
    }

    switch(action.type) {
        case types.LOAD_USER_INFO_SUCCESS:
            return {
                distance_uom_preference: action.userInfo.distance_uom_preference,
                has_flexible_planning_enabled: action.userInfo.has_flexible_planning_enabled,
                has_planned_activity_for_today: action.userInfo.has_planned_activity_for_today,
                has_planned_activity_for_this_week: action.userInfo.has_planned_activity_for_this_week,
                strava_client_id: action.userInfo.strava_client_id,
                strava_client_secret: action.userInfo.strava_client_secret,
                ...state
            };
        case types.UPDATE_USER_INFO_SUCCESS:
            return {
                distance_uom_preference: action.updatedUserInfo.distance_uom_preference,
                has_flexible_planning_enabled: action.updatedUserInfo.has_flexible_planning_enabled,
                has_planned_activity_for_today: action.updatedUserInfo.has_planned_activity_for_today,
                has_planned_activity_for_this_week: action.updatedUserInfo.has_planned_activity_for_this_week,
                ...state
            };
        case types.STORE_USER_STRAVA_ACCESS_TOKEN:
            return {
                ...state,
                strava_access_token: action.stravaAccessToken
            };
        default:
            return state;
    }
}