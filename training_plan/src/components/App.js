import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Spinner } from "react-redux-spinner";

import Calendar from "./Calendar";
import Alert from "./Alert";
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
            <Spinner />
            <Alert />
            <h2>Training Plan</h2>
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