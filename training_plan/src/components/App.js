import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Calendar from "./Calendar";
import TrainingPlanIntroContainer from "./TrainingPlanIntroContainer";
import * as activityTypeActions from "../actions/activityTypeActions";
import * as userActions from "../actions/userActions";

class App extends Component {

    componentDidMount() {
        this.props.userActions.loadUserInfo();
        this.props.activityTypeActions.loadActivityTypes();
    }

    render() {
        return (
            // This is where we can add routing in due course
            <>
            <h2>Training Plan</h2>
            <TrainingPlanIntroContainer />
            <Calendar />
            </>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        activityTypeActions: bindActionCreators(activityTypeActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;