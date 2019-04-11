import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dateFns from "date-fns";

import * as completedExerciseActions from "../actions/completedExerciseActions";
import * as plannedActivityActions from "../actions/plannedActivityActions";
import { filterPlannedExercises, filterPlannedActivities } from "../helpers/trainingPlan";


class TodoContainer extends Component {

    handleCompleteExercise = (plannedExerciseId) => {
        const today = new Date();
        const weekStartDate = dateFns.startOfWeek(dateFns.startOfMonth(today), {weekStartsOn: 1});
        
        const requestBody = JSON.stringify({ 
            planned_exercise_id: plannedExerciseId
        })
        
        this.props.completedExerciseActions.addCompletedExercise(requestBody).then(result => {
            this.props.plannedActivityActions.loadPlannedActivities(weekStartDate, today);
        });
    }

    renderPlannedActivityButton = (plannedActivity) => {
        const buttonClass = "btn btn-sm " + plannedActivity.category_key;

        return (
            <span  key={plannedActivity.id}>
            <a className={buttonClass} role="button" href="#todo">
						{plannedActivity.activity_type}
						<br />
						<small>
							{plannedActivity.description && plannedActivity.description}
                            {!plannedActivity.description && <>&nbsp;</>}
							<br />
							{plannedActivity.planned_distance_formatted && plannedActivity.planned_distance_formatted}
                            {!plannedActivity.planned_distance_formatted && <>&nbsp;</>}
						</small>
			</a>
            &nbsp;
            </span>
        );
    }

    renderPlannedExerciseButton = (plannedExercise) => {
        const buttonClass = "btn btn-sm ml-1 mr-1 " + plannedExercise.category_key;

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
        const today = new Date();
        const todayFormatted = dateFns.format(today, "DD MMMM");
        const hasPlannedActivityToday = this.props.user && this.props.user.has_planned_activity_for_today;

        const plannedActivities = filterPlannedActivities(this.props.plannedActivities, today, this.props.planningPeriod);
        const plannedActivityButtons = plannedActivities.map(this.renderPlannedActivityButton);

        const plannedExerciseCategories = filterPlannedExercises(this.props.plannedExercises, today, this.props.planningPeriod);
        let plannedExerciseButtons = [];
        for (let plannedExerciseCategory of plannedExerciseCategories) {
            plannedExerciseButtons.push(plannedExerciseCategory.exercises.map(this.renderPlannedExerciseButton));
        }

        return (
            <div className="card mt-3">
                <div className="card-header">
                    <h4>To Do for {todayFormatted}</h4>
                </div>
                <div className="card-body exercise-buttons">

                    {/* If there's planned activity for the day but nothing remaining then display well done message */}
                    {hasPlannedActivityToday && plannedActivities.length === 0 && plannedExerciseCategories.length === 0 &&
                    <div className="alert alert-success">
                        <i className="fa fa-check-square-o fa-lg"></i> Great work! You've ticked off your planned activities and exercises for today!
                    </div>}
                    {!hasPlannedActivityToday &&
                    <p>You don't have any activities or exercises planned for today. Chill out and let your muscles recover!</p>}
                    {hasPlannedActivityToday && (plannedActivities.length > 0 || plannedExerciseCategories.length > 0) &&
                    <>
                        <p>Here are your planned activities and exercises that you have left to do today. Use the buttons to tick each one off.</p>
                        {plannedActivityButtons}
                        {plannedExerciseButtons}
                    </>}
                    <p className="mt-2 mb-0">
                        <a href="{{ url_for('training_plan') }}">Full Training Plan</a>
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
        completedExerciseActions: bindActionCreators(completedExerciseActions, dispatch)
    };
}

TodoContainer = connect(mapStateToProps, mapDispatchToProps)(TodoContainer);

export default TodoContainer;