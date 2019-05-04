import React, { Component } from "react";
import { connect } from "react-redux";

class TrainingPlanIntroContainer extends Component { 
    render() {
        return (
            <div className="alert alert-info">
                Try out our brand new Training Plan Generator to get yourself ready for your next running race. Find out more below the calendar.
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

TrainingPlanIntroContainer = connect(mapStateToProps)(TrainingPlanIntroContainer);

export default TrainingPlanIntroContainer;