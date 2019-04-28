import * as types from "./actionTypes";

export function showAlert(alertMessage, actionLinkText, actionFormInitData) {
    return {
        type: types.SHOW_ALERT,
        alertMessage: alertMessage,
        actionLinkText: actionLinkText,
        actionFormInitData: actionFormInitData
    };
}