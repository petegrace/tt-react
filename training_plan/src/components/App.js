import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Calendar from "./Calendar";
import TrainingPlanTemplatesList from "./TrainingPlanTemplatesList";
import * as activityTypeActions from "../actions/activityTypeActions";

class App extends Component {

    componentDidMount() {
        this.props.activityTypeActions.loadActivityTypes();
    }

    render() {
        return (
            // This is where we can add routing in due course
            <>
            <h2>Training Plan</h2>
            <div className="alert alert-info">
                Use our brand new training calendar to plan your activities and exercises.
                    You can schedule activities to do just once or on a recurring weekly basis,
                    and they'll show up on your home page when it's time to do them.
            </div>
            <Calendar />
            <TrainingPlanTemplatesList />
            </>
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