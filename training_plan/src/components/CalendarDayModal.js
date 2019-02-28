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
            recurrence: values.recurrence,
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
    
    handleRemovePlannedActivity = (plannedActivityId, scope) => {
        this.props.plannedActivityActions.deletePlannedActivity(plannedActivityId, scope).then(result => {
            this.props.refresh(this.props.calendarDay);
        });
    }

    // CRUD operations for planned exercises
    handleAddPlannedExercise = (id) => {
        const calendarDay = dateFns.format(this.props.calendarDay, "YYYY-MM-DD");
        console.log(id)
        if (!id) {
            const formInitData = {
                isNewExerciseType: true,
                measured_by: "reps",
                planned_sets: 1,
                recurrence: "weekly",
                planned_date: dateFns.format(this.props.calendarDay, "YYYY-MM-DD"),
                repeatOption: "Repeat every " + dateFns.format(this.props.calendarDay, "dddd"),
                categoryOptions: this.props.exerciseCategories
            }
            this.setState({
                plannedExerciseFormInitData: formInitData
            });
            this.togglePlannedExerciseForm();
        } else {
            const categories = this.props.plannedExercises.filter(function(plannedExercise) {
                return plannedExercise.planned_date === calendarDay;
            });

            let requestBody;
            let existingPlannedExerciseId;
            for (let category of categories) {
                for (let exercise of category.exercises) {
                    if (exercise.exercise_type_id === id) {
                        existingPlannedExerciseId = exercise.id;
                        requestBody = JSON.stringify({ 
                            recurrence: exercise.recurrence,
                            planned_date: calendarDay,
                            planned_sets: (exercise.planned_sets + 1),
                            planned_reps: exercise.planned_reps,
                            planned_seconds: exercise.planned_seconds
                        });
                    }
                }
            }
            console.log(requestBody)
            
            if (existingPlannedExerciseId) {
                this.props.plannedExerciseActions.updatePlannedExercise(existingPlannedExerciseId, requestBody).then(result => {
                    this.props.refresh(this.props.calendarDay);
                });
            } else {
                const exerciseType = this.props.exerciseTypes.filter(function(exerciseType) {
                    return exerciseType.id === id;
                })[0];
                requestBody = JSON.stringify({
                    exercise_type_id: id,
                    recurrence: "weekly",
                    planned_date: calendarDay,
                    planned_reps: exerciseType.default_reps,
                    planned_seconds: exerciseType.default_seconds
                });
                console.log(requestBody)
                this.props.plannedExerciseActions.addPlannedExercise(requestBody).then(result => {
                    this.props.refresh(this.props.calendarDay);
                });                
            }
        }
    }

    handleEditPlannedExercise = (formInitData) => {
        this.setState({
            plannedExerciseFormInitData: formInitData
        });
        this.togglePlannedExerciseForm();
    }

    handleSavePlannedExercise = (values) => {
        if (values.id) {
            const requestBody = JSON.stringify({ 
                planned_date: values.planned_date,
                recurrence: values.recurrence,
                planned_sets: values.planned_sets,
                planned_reps: values.planned_reps,
                planned_seconds: values.planned_seconds
            });
            this.props.plannedExerciseActions.updatePlannedExercise(values.id, requestBody).then(result => {
                this.props.refresh(this.props.calendarDay);
            });
        } else {
            const requestBody = JSON.stringify({
                exercise_name: values.exercise_name,
                measured_by: values.measured_by,
                exercise_category_id: values.exercise_category_id,
                planned_sets: values.planned_sets,
                planned_reps: values.planned_reps,
                planned_seconds: values.planned_seconds,
                recurrence: values.recurrence,
                planned_date: dateFns.format(this.props.calendarDay, "YYYY-MM-DD")
            });
            this.props.plannedExerciseActions.addPlannedExercise(requestBody).then(result => {
                this.props.refresh(this.props.calendarDay);
            });
        }
        this.togglePlannedExerciseForm();
    }

    handleRemovePlannedExercise = (plannedExerciseId, scope) => {
        this.props.plannedExerciseActions.deletePlannedExercise(plannedExerciseId, scope).then(result => {
            this.props.refresh(this.props.calendarDay);
        });
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
                            <PlannedActivitiesList calendarDay={this.props.calendarDay} onEdit={this.handleEditPlannedActivity} onRemove={this.handleRemovePlannedActivity} />
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
        plannedExercises: state.plannedExercises,
        exerciseTypes: state.exerciseTypes,
        exerciseCategories: state.exerciseCategories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        plannedActivityActions: bindActionCreators(plannedActivityActions, dispatch),
        plannedExerciseActions: bindActionCreators(plannedExerciseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDayModal);