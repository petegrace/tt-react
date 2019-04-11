import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dateFns from "date-fns";
import { Spinner } from "react-redux-spinner";

import * as plannedActivityActions from "../actions/plannedActivityActions";
import * as userActions from "../actions/userActions";
import Alert from "./Alert";
import TodoContainer from "./TodoContainer";
import CountersContainer from "./CountersContainer";

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
            <Spinner />
            <Alert />
            <TodoContainer planningPeriod="day" />
            {/* TODO: Only display if flexible planning is enabled and then ensure it makes sense for week */}
            {/* <TodoContainer planningPeriod="week" /> */}
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