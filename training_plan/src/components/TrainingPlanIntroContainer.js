import React, { Component } from "react";
import { connect } from "react-redux";
//import { bindActionCreators } from "redux";

import EnableFlexiblePlanningButton from "./EnableFlexiblePlanningButton";

class TrainingPlanIntroContainer extends Component { 
    render() {
        return (
            <>
            {this.props.user && !this.props.user.has_flexible_planning_enabled &&
            <div className="alert alert-info">
                You can now plan activities and exercises for a given week without having to commit to what day you'll do them on.&nbsp;
                <EnableFlexiblePlanningButton />
            </div>}
            </>
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