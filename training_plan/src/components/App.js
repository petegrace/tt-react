import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Calendar from "./Calendar";
import * as activityTypeActions from "../actions/activityTypeActions";

class App extends Component {

    componentDidMount() {
        this.props.activityTypeActions.loadActivityTypes();
    }

    render() {
        return (
            // This is where we can add routing in due course
            <Calendar />
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        activityTypeActions: bindActionCreators(activityTypeActions, dispatch)
    };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;