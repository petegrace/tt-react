import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dateFns from "date-fns";
import { Spinner } from "react-redux-spinner";

import * as plannedActivityActions from "../actions/plannedActivityActions";
import * as completedExerciseActions from "../actions/completedExerciseActions";
import * as combinedRecentActivityActions from "../actions/combinedRecentActivityActions";
import * as userActions from "../actions/userActions";
import Alert from "./Alert";
import TodoContainer from "./TodoContainer";
import CountersContainer from "./CountersContainer";
import RecentActivityContainer from "./RecentActivityContainer";
import StravaImportContainer from "./StravaImportContainer";
import CompletedExerciseFormModal from "./CompletedExerciseFormModal";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCompletedExerciseForm: false,
            completedExerciseFormInitData: null
        }
    }

    componentDidMount() {
        const today = new Date();
        const weekStartDate = dateFns.startOfWeek(today, {weekStartsOn: 1});
        this.props.plannedActivityActions.loadPlannedActivities(weekStartDate, today);
        this.props.userActions.loadUserInfo();
    } 

    handleEditCompletedExercise = (formInitData) => {
        this.setState({
            showCompletedExerciseForm: true,
            completedExerciseFormInitData: formInitData
        });
    }

    handleSaveCompletedExercise = (values) => {        
        const requestBody = JSON.stringify({ 
            reps: values.reps,
            seconds: values.seconds
        });
        this.props.completedExerciseActions.updateCompletedExercise(values.id, requestBody).then(result => {
            this.props.combinedRecentActivityActions.loadCombinedRecentActivities(1, 5);
        });

        this.setState({
            showCompletedExerciseForm: false,
        });
    }

    handleCloseCompletedExerciseForm = () => {
        this.setState({
            showCompletedExerciseForm: false,
        });
    }

    render() {
        const user = this.props.user;

        return (
            // This is where we can add routing in due course
            <>
            <Spinner />
            <Alert onActionLinkClick={this.handleEditCompletedExercise} />
            {user && (!user.has_flexible_planning_enabled || user.has_planned_activity_for_today) && (
            <TodoContainer planningPeriod="day" />)}
            {user && user.has_flexible_planning_enabled && (user.has_planned_activity_for_this_week || !user.has_planned_activity_for_today) && (
            <TodoContainer planningPeriod="week" />)}
            <RecentActivityContainer onEditCompletedExercise={this.handleEditCompletedExercise} />
            <StravaImportContainer />
            <CountersContainer />
            {this.state.showCompletedExerciseForm && (
            <CompletedExerciseFormModal className="modal" initData={this.state.completedExerciseFormInitData} onSubmit={this.handleSaveCompletedExercise} close={this.handleCloseCompletedExerciseForm} />)}
            </>
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
        plannedActivityActions: bindActionCreators(plannedActivityActions, dispatch),
        completedExerciseActions: bindActionCreators(completedExerciseActions, dispatch),
        combinedRecentActivityActions: bindActionCreators(combinedRecentActivityActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch)
    };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;