import * as types from "../actions/actionTypes";

export default function alertReducer(state, action) {
    if (state === undefined) {
        return {
            showAlert: false,
            message: null
        };
    }

    switch(action.type) {
        case types.SHOW_ALERT:
            return {
                showAlert: true,
                message: action.alertMessage,
                actionLinkText: action.actionLinkText,
                actionFormInitData: action.actionFormInitData
            };
        default:
            return state;
    }
}