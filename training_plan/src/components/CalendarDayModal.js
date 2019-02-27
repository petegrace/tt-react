import React, { Component } from "react";
import dateFns from "date-fns";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./CalendarDayModal.css";
import ActivityTypeButtonSet from "./ActivityTypeButtonSet";
import ExerciseTypeButtonSet from "./ExerciseTypeButtonSet";
import PlannedActivitiesList from "./PlannedActivitiesList";
import PlannedExercisesList from "./PlannedExercisesList";
import PlannedActivityForm from "./PlannedActivityForm";
import PlannedExerciseForm from "./PlannedExerciseForm";
import * as plannedActivityActions from "../actions/plannedActivityActions";
import * as plannedExerciseActions from "../actions/plannedExerciseActions";

class CalendarDayModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCalendarDayMain: true,
            showPlannedActivityForm: false,
            showPlannedExerciseForm: false,
            isFutureDate: (props.calendarDay >= dateFns.startOfDay(new Date())),
            plannedActivities: props.plannedActivities
        }
    }

    togglePlannedActivityForm = () => {
        this.setState({
            showCalendarDayMain: !this.state.showCalendarDayMain,
            showPlannedActivityForm: !this.state.showPlannedActivityForm,
            showPlannedExerciseForm: false
        })
    }

    togglePlannedExerciseForm = () => {
        this.setState({
            showCalendarDayMain: !this.state.showCalendarDayMain,
            showPlannedExerciseForm: !this.state.showPlannedExerciseForm,
            showPlannedActivityForm: false
        })
    }

    // Planned Activity CRUD operations
    handleAddPlannedActivity = (formInitData) => {
        this.setState({
            plannedActivityFormInitData: formInitData
        });
        this.togglePlannedActivityForm();
    }

    handleEditPlannedActivity = (formInitData) => {
        this.setState({
            plannedActivityFormInitData: formInitData
        });
        this.togglePlannedActivityForm();
    }

    handleSavePlannedActivity = (values) => {
        const requestBody = JSON.stringify({ 
            activity_type: values.activity_type,
            planned_date: values.planned_date,
            description: values.description,
            planned_distance: values.planned_distance
        })
        if (values.id) {
            this.props.plannedActivityActions.updatePlannedActivity(values.id, requestBody).then(result => {
                this.props.refresh(this.props.calendarDay);
            });
        } else {
            this.props.plannedActivityActions.addPlannedActivity(requestBody).then(result => {
                this.props.refresh(this.props.calendarDay);
            });
        }
        this.togglePlannedActivityForm();
    }
    
    // todo: refactor the remove handling to be done here instead of in the presentational component

    // CRUD operations for planned exercises
    handleAddPlannedExercise = (id) => {
        const calendarDay = dateFns.format(this.props.calendarDay, "YYYY-MM-DD");
        const categories = this.props.plannedExercises.filter(function(plannedExercise) {
            return plannedExercise.planned_date === calendarDay;
        });

        let existingPlannedExerciseId;
        let patchRequestBody;
        for (let category of categories) {
            for (let exercise of category.exercises) {
                if (exercise.exercise_type_id === id) {
                    existingPlannedExerciseId = exercise.id;
                    patchRequestBody = JSON.stringify({ 
                        planned_sets: (exercise.planned_sets + 1),
                        planned_reps: exercise.planned_reps,
                        planned_seconds: exercise.planned_seconds
                    });
                    break;
                }
            }
        }
        
        if (existingPlannedExerciseId) {
            this.props.plannedExerciseActions.updatePlannedExercise(existingPlannedExerciseId, patchRequestBody).then(result => {
                this.props.refresh(this.props.calendarDay);
            });
        }
    }

    handleEditPlannedExercise = (formInitData) => {
        this.setState({
            plannedExerciseFormInitData: formInitData
        });
        this.togglePlannedExerciseForm();
    }

    handleSavePlannedExercise = (values) => {
        const requestBody = JSON.stringify({ 
            planned_sets: values.planned_sets,
            planned_reps: values.planned_reps,
            planned_seconds: values.planned_seconds
        });
        if (values.id) {
            this.props.plannedExerciseActions.updatePlannedExercise(values.id, requestBody).then(result => {
                this.props.refresh(this.props.calendarDay);
            });
        } //else {
        //     this.props.plannedActivityActions.addPlannedActivity(requestBody).then(result => {
        //         this.props.refresh(this.props.calendarDay);
        //     });
        // }
        this.togglePlannedExerciseForm();
    }

    handleRemovePlannedExercise = (plannedExerciseId) => {
        this.props.plannedExerciseActions.deletePlannedExercise(plannedExerciseId);
    }

    render() {
        const dateFormat = "dddd DD MMMM YYYY";

        return (
            <div className="modal-back-drop">
                <div className="modal-wrapper">
                    <div className="calendar-modal-header">
                        <h4>{dateFns.format(this.props.calendarDay, dateFormat)}</h4>
                        <span className="close-modal-btn" onClick={this.props.close}><i className="fa fa-window-close"></i></span>
                    </div>
                    <div className="calendar-modal-body">
                        <div>
                            {this.state.showCalendarDayMain && this.state.isFutureDate &&
                            <>
                            <PlannedActivitiesList calendarDay={this.props.calendarDay} onEdit={this.handleEditPlannedActivity} />
                            <PlannedExercisesList calendarDay={this.props.calendarDay} onEdit={this.handleEditPlannedExercise} onRemove={this.handleRemovePlannedExercise} />
                            <ActivityTypeButtonSet calendarDay={this.props.calendarDay} onAdd={this.handleAddPlannedActivity} />
                            <ExerciseTypeButtonSet calendarDay={this.props.calendarDay} onAdd={this.handleAddPlannedExercise} />
                            </>}
                            {this.state.showPlannedActivityForm &&
                            <PlannedActivityForm initData={this.state.plannedActivityFormInitData} onSubmit={this.handleSavePlannedActivity} handleBackClick={this.togglePlannedActivityForm} />}
                            {this.state.showPlannedExerciseForm &&
                            <PlannedExerciseForm initData={this.state.plannedExerciseFormInitData} onSubmit={this.handleSavePlannedExercise} handleBackClick={this.togglePlannedExerciseForm} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

function mapStateToProps(state) {
    return {
        plannedExercises: state.plannedExercises
    };
}

function mapDispatchToProps(dispatch) {
    return {
        plannedActivityActions: bindActionCreators(plannedActivityActions, dispatch),
        plannedExerciseActions: bindActionCreators(plannedExerciseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDayModal);