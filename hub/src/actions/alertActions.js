import * as types from "./actionTypes";

export function showAlert(alertMessage) {
    return {
        type: types.SHOW_ALERT,
        alertMessage: alertMessage
    };
}