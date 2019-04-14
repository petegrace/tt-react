import { pendingTask, begin, end } from "react-redux-spinner";

import * as types from "./actionTypes";
import AnnualStatsApi from "../api/AnnualStatsApi";

export function loadAnnualStats() {
    return function(dispatch) {
        dispatch({
            type: types.LOAD_ANNUAL_STATS,
            [ pendingTask ]: begin
        });
        const api = new AnnualStatsApi();
        return api.getAnnualStats().then(responseData => {
            if (responseData) {
                dispatch(loadAnnualStatsSuccess(responseData));
            }
        }).catch(error => {
            dispatch({
                type: types.ERROR_ENCOUNTERED,
                [ pendingTask ]: end
            });
            throw(error);
        });
    }
}

export function loadAnnualStatsSuccess(responseData) {
    return {
        type: types.LOAD_ANNUAL_STATS_SUCCESS,
        [ pendingTask ]: end,
        annualStats: responseData
    };
}