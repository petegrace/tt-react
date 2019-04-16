import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dateFns from "date-fns";
import { Spinner } from "react-redux-spinner";

import * as plannedActivityActions from "../actions/plannedActivityActions";
import * as completedExerciseActions from "../actions/completedExerciseActions";
import * as combinedRecentActivityActions from "../actions/combinedRecentActivityActions";
import * as userActions from "../actions/userActions";
import * as activityTypeActions from "../actions/activityTypeActions";
import * as annualStatsActions from "../actions/annualStatsActions";
import Alert from "./Alert";
import TodoContainer from "./TodoContainer";
import CountersContainer from "./CountersContainer";
import RecentActivityContainer from "./RecentActivityContainer";
import StravaImportContainer from "./StravaImportContainer";
import ExerciseTypeButtonSet from "./ExerciseTypeButtonSet";
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
        this.props.activityTypeActions.loadActivityTypes();
    }

    handleCompleteAdhocExercise = (exerciseTypeId) => {
        if (!exerciseTypeId) {
            const formInitData = {
                isNewExerciseType: true,
                measured_by: "reps",
                categoryOptions: this.props.exerciseCategories,
                exercise_category_id: (this.props.exerciseCategories.length > 0) ? this.props.exerciseCategories[0].id : null
            }
            this.setState({
                showCompletedExerciseForm: true,
                completedExerciseFormInitData: formInitData
            });
        } else {
            const requestBody = JSON.stringify({ 
                exercise_type_id: exerciseTypeId
            });
            
            this.props.completedExerciseActions.addCompletedExercise(requestBody).then(result => {
                this.props.combinedRecentActivityActions.loadCombinedRecentActivities(1, 5);
                this.props.annualStatsActions.loadAnnualStats();
            });
        }
        
    }

    handleEditCompletedExercise = (formInitData) => {
        this.setState({
            showCompletedExerciseForm: true,
            completedExerciseFormInitData: formInitData
        });
    }

    handleSaveCompletedExercise = (values) => {
        if (values.id) {    
            const requestBody = JSON.stringify({ 
                reps: values.reps,
                seconds: values.seconds
            });
            this.props.completedExerciseActions.updateCompletedExercise(values.id, requestBody).then(result => {
                this.props.combinedRecentActivityActions.loadCombinedRecentActivities(1, 5);
            });
        } else {
            const requestBody = JSON.stringify({
                exercise_name: values.exercise_name,
                measured_by: values.measured_by,
                exercise_category_id: values.exercise_category_id,
                reps: values.reps,
                seconds: values.seconds
            });
            this.props.completedExerciseActions.addCompletedExercise(requestBody).then(result => {
                this.props.combinedRecentActivityActions.loadCombinedRecentActivities(1, 5);
                // we need to refresh buttons too to pick up the new one!
                this.props.activityTypeActions.loadActivityTypes();
            });
        }

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
        
        let exerciseTypeIdsToExcludeFromAdhocButtons = [];
        for (let categoryAndPeriodGroup of this.props.plannedExercises) {
            for (let exercise of categoryAndPeriodGroup.exercises) {
                exerciseTypeIdsToExcludeFromAdhocButtons.push(exercise.exercise_type_id);
            }
        }

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
            <div className="card mt-3">
                <div className="card-header">
                    <h4>Record adhoc exercises</h4>
                </div>
                <div className="card-body exercise-buttons">
                    <p>Wanting to do a few extra exercises? Use the buttons below to record them as you complete each exercise, without adding to your training plan.</p>
                    <ExerciseTypeButtonSet calendarDay={this.props.calendarDay} onAdd={this.handleCompleteAdhocExercise} exerciseTypeIdsToExclude={exerciseTypeIdsToExcludeFromAdhocButtons} />
                </div>
            </div>
            <CountersContainer />
            {this.state.showCompletedExerciseForm && (
            <CompletedExerciseFormModal className="modal" initData={this.state.completedExerciseFormInitData} onSubmit={this.handleSaveCompletedExercise} close={this.handleCloseCompletedExerciseForm} />)}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        plannedExercises: state.plannedExercises,
        exerciseCategories: state.exerciseCategories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        plannedActivityActions: bindActionCreators(plannedActivityActions, dispatch),
        completedExerciseActions: bindActionCreators(completedExerciseActions, dispatch),
        combinedRecentActivityActions: bindActionCreators(combinedRecentActivityActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        activityTypeActions: bindActionCreators(activityTypeActions, dispatch),
        annualStatsActions: bindActionCreators(annualStatsActions, dispatch)
    };
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;