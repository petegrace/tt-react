import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dateFns from "date-fns";

import * as plannedActivityActions from "../actions/plannedActivityActions";
import * as userActions from "../actions/userActions";
import CountersContainer from "./CountersContainer";
import TodoContainer from "./TodoContainer";

class App extends Component {

    componentDidMount() {
        const today = new Date();
        const weekStartDate = dateFns.startOfWeek(dateFns.startOfMonth(today), {weekStartsOn: 1});
        this.props.plannedActivityActions.loadPlannedActivities(weekStartDate, today);
        this.props.userActions.loadUserInfo();
    }

    render() {
        return (
            // This is where we can add routing in due course
            <>
            <TodoContainer planningPeriod="day" />
            <CountersContainer />
            </>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        plannedActivityActions: bindActionCreators(plannedActivityActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    };
}

App = connect(null, mapDispatchToProps)(App);

export default App;