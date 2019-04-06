import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../actions/userActions";

class EnableFlexiblePlanningButton extends Component {

    handleEnableFlexiblePlanning = () => {
        const requestBody = JSON.stringify({
            distance_uom_preference: this.props.user.distance_uom_preference,
            has_flexible_planning_enabled: true
        });
        this.props.userActions.updateUserInfo(requestBody);
    }

    render() {
        return (
            <a href="#flex" onClick={() => this.handleEnableFlexiblePlanning()}>Click to Enable Flexible Planning</a>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch)
    };
}

EnableFlexiblePlanningButton = connect(mapStateToProps, mapDispatchToProps)(EnableFlexiblePlanningButton);

export default EnableFlexiblePlanningButton;