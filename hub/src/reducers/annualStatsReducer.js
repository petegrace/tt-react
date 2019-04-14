import * as types from "../actions/actionTypes";

export default function annualStatsReducer(state, action) {
    if (state === undefined) {
        return {
            heading: "",
            counters: []
        };
    }

    switch(action.type) {
        case types.LOAD_ANNUAL_STATS_SUCCESS:
            return action.annualStats;
        default:
            return state;
    }
}