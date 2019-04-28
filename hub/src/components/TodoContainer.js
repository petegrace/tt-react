import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as dateFns from "date-fns";

import * as completedExerciseActions from "../actions/completedExerciseActions";
import * as plannedActivityActions from "../actions/plannedActivityActions";
import * as combinedRecentActivityActions from "../actions/combinedRecentActivityActions";
import * as annualStatsActions from "../actions/annualStatsActions";
import { filterPlannedExercises, filterPlannedActivities } from "../helpers/trainingPlan";
import StravaImportButton from "./StravaImportButton";

class TodoContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            today: new Date(),
            weekStartDate: dateFns.startOfWeek(new Date(), {weekStartsOn: 1})
        }
    }

    handleCompleteExercise = (plannedExerciseId) => {
        const requestBody = JSON.stringify({ 
            planned_exercise_id: plannedExerciseId
        });
        
        this.props.completedExerciseActions.addCompletedExercise(requestBody).then(result => {
            this.props.plannedActivityActions.loadPlannedActivities(this.state.weekStartDate, this.state.today);
            this.props.combinedRecentActivityActions.loadCombinedRecentActivities(1, 5);
            this.props.annualStatsActions.loadAnnualStats();
        });
    }

    renderPlannedActivityButton = (plannedActivity) => {
        const buttonClass = "btn btn-sm mr-1 ml-1 " + plannedActivity.category_key;

        return (
            <span key={plannedActivity.id}>
                <StravaImportButton buttonClass={buttonClass} buttonContent={(
                        <>
                        {plannedActivity.activity_subtype}
						<br />
						<small>
							{plannedActivity.planned_distance_formatted && plannedActivity.planned_distance_formatted}
                            {!plannedActivity.planned_distance_formatted && <>&nbsp;</>}
						    <br />&nbsp;
						</small>
                        </>)} />
			</span>
        );
    }

    renderPlannedExerciseButton = (plannedExercise) => {
        const buttonClass = "btn btn-sm mr-1  ml-1 " + plannedExercise.category_key;

        return (
            <button key={plannedExercise.id} className={buttonClass} onClick={() => this.handleCompleteExercise(plannedExercise.id)}>
                {plannedExercise.exercise_name }
                <br />
                <small>
                    {plannedExercise.measured_by === "reps" &&
                    <>[{plannedExercise.planned_reps} reps]</>}
                    {plannedExercise.measured_by === "seconds" &&
                    <>[{plannedExercise.planned_seconds} secs]</>}
                    <br />
                    {/* TODO: need to deduct completed sets */}
                    {plannedExercise.planned_sets - plannedExercise.completed_sets} sets to do
                </small>
            </button>
        );
    }

    render() {
        const today = this.state.today;
        const weekStartDate = this.state.weekStartDate;
        const planningPeriod = this.props.planningPeriod;
        const planningPeriodDate = planningPeriod === "week" ? weekStartDate : today
        const planningPeriodDateFormatted = (planningPeriod === "week" ? "week of " : "") + dateFns.format(planningPeriodDate, "DD MMMM") + (planningPeriod === "week" ? " (on any day)" : "");
        const planningPeriodFriendlyDescription = planningPeriod === "week" ? " this week" : "today";
        const hasPlannedActivityForToday = this.props.user && this.props.user.has_planned_activity_for_today;
        const hasPlannedActivityForThisWeek = this.props.user && this.props.user.has_planned_activity_for_this_week;
        const hasPlannedActivityForPeriod = planningPeriod === "week" ? hasPlannedActivityForThisWeek : hasPlannedActivityForToday

        const plannedActivities = filterPlannedActivities(this.props.plannedActivities, planningPeriodDate, planningPeriod);
        const plannedActivityButtons = plannedActivities.map(this.renderPlannedActivityButton);

        const plannedExerciseCategories = filterPlannedExercises(this.props.plannedExercises, planningPeriodDate, planningPeriod);
        let plannedExerciseButtons = [];
        for (let plannedExerciseCategory of plannedExerciseCategories) {
            plannedExerciseButtons.push(plannedExerciseCategory.exercises.map(this.renderPlannedExerciseButton));
        }

        return (
            <div className="card mt-3">
                <div className="card-header">
                    <h4>To Do for {planningPeriodDateFormatted}</h4>
                </div>
                <div className="card-body exercise-buttons">

                    {/* If there's planned activity for the day but nothing remaining then display well done message */}
                    {hasPlannedActivityForPeriod && plannedActivities.length === 0 && plannedExerciseCategories.length === 0 &&
                    <div className="alert alert-success">
                        <i className="fa fa-check-square-o fa-lg"></i> Great work! You've ticked off your planned activities and exercises for {planningPeriodFriendlyDescription}!
                    </div>}
                    {!hasPlannedActivityForPeriod &&
                    <p>You don't have any activities or exercises planned for {planningPeriodFriendlyDescription}. Chill out and let your muscles recover!</p>}
                    {hasPlannedActivityForPeriod && (plannedActivities.length > 0 || plannedExerciseCategories.length > 0) &&
                    <>
                        <p>Here are your planned activities and exercises that you have left to do {planningPeriodFriendlyDescription}. Use the buttons to tick each one off.</p>
                        {plannedActivityButtons}
                        {plannedExerciseButtons}
                    </>}
                    <p className="mt-2 mb-0">
                        <a href="/training_plan">Full Training Plan</a>
                    </p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        plannedActivities: state.plannedActivities,
        plannedExercises: state.plannedExercises,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        plannedActivityActions: bindActionCreators(plannedActivityActions, dispatch),
        completedExerciseActions: bindActionCreators(completedExerciseActions, dispatch),
        combinedRecentActivityActions: bindActionCreators(combinedRecentActivityActions, dispatch),
        annualStatsActions: bindActionCreators(annualStatsActions, dispatch)
    };
}

TodoContainer = connect(mapStateToProps, mapDispatchToProps)(TodoContainer);

export default TodoContainer;