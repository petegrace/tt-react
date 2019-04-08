import React, { Component } from "react";
import dateFns from "date-fns";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./CalendarDayModal.css";
import ActivityTypeButtonSet from "./ActivityTypeButtonSet";
import ExerciseTypeButtonSet from "./ExerciseTypeButtonSet";
import CompletedActivitiesList from "./CompletedActivitiesList";
import CompletedExercisesList from "./CompletedExercisesList";
import PlannedRacesList from "./PlannedRacesList";
import PlannedActivitiesList from "./PlannedActivitiesList";
import PlannedExercisesList from "./PlannedExercisesList";
import PlannedActivityForm from "./PlannedActivityForm";
import PlannedRaceForm from "./PlannedRaceForm";
import PlannedExerciseForm from "./PlannedExerciseForm";
import * as plannedActivityActions from "../actions/plannedActivityActions";
import * as plannedRaceActions from "../actions/plannedRaceActions";
import * as plannedExerciseActions from "../actions/plannedExerciseActions";
import * as activityTypeActions from "../actions/activityTypeActions";

class CalendarDayModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCalendarDayMain: true,
            showPlannedActivityForm: false,
            showPlannedRaceForm: false,
            showPlannedExerciseForm: false,
            isFutureDate: (props.calendarDay >= dateFns.startOfDay(new Date())),
            plannedActivities: props.plannedActivities
        }
    }

    togglePlannedActivityForm = () => {
        this.setState({
            showCalendarDayMain: !this.state.showCalendarDayMain,
            showPlannedActivityForm: !this.state.showPlannedActivityForm,
            showPlannedRaceForm: false,
            showPlannedExerciseForm: false
        })
    }

    togglePlannedRaceForm = () => {
        this.setState({
            showCalendarDayMain: !this.state.showCalendarDayMain,
            showPlannedRaceForm: !this.state.showPlannedRaceForm,
            showPlannedActivityForm: false,
            showPlannedExerciseForm: false
        })
    }

    togglePlannedExerciseForm = () => {
        this.setState({
            showCalendarDayMain: !this.state.showCalendarDayMain,
            showPlannedExerciseForm: !this.state.showPlannedExerciseForm,
            showPlannedActivityForm: false,
            showPlannedRaceForm: false
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
            planning_period: values.planning_period,
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

    

    // Planned Race CRUD operations
    handleAddPlannedRace = (formInitData) => {
        this.setState({
            plannedRaceFormInitData: formInitData
        });
        this.togglePlannedRaceForm();
    }

    handleEditPlannedRace = (formInitData) => {
        this.setState({
            plannedRaceFormInitData: formInitData
        });
        this.togglePlannedRaceForm();
    }

    handleSavePlannedRace = (values) => {
        const requestBody = JSON.stringify({ 
            name: values.name,
            planned_date: values.planned_date,
            race_type: values.race_type,
            distance: values.distance,
            entry_status: values.entry_status,
            race_website_url: values.race_website_url,
            notes: values.notes
        });
        console.log(requestBody);
        if (values.id) {
            this.props.plannedRaceActions.updatePlannedRace(values.id, requestBody).then(result => {
                this.props.refresh(this.props.calendarDay);
            });
        } else {
            this.props.plannedRaceActions.addPlannedRace(requestBody).then(result => {
                this.props.refresh(this.props.calendarDay);
            });
        }
        this.togglePlannedRaceForm();
    }
    
    handleRemovePlannedRace = (plannedRaceId) => {
        this.props.plannedRaceActions.deletePlannedRace(plannedRaceId).then(result => {
            this.props.refresh(this.props.calendarDay);
        });
    }

    // CRUD operations for planned exercises
    handleAddPlannedExercise = (id) => {
        const calendarDay = dateFns.format(this.props.calendarDay, "YYYY-MM-DD");
        const planningPeriod = this.props.selectionType;

        if (!id) {
            const formInitData = {
                isNewExerciseType: true,
                measured_by: "reps",
                planned_sets: 1,
                planning_period: planningPeriod,
                recurrence: "weekly",
                planned_date: dateFns.format(this.props.calendarDay, "YYYY-MM-DD"),
                repeatOption: "Repeat every " + (planningPeriod === "day" ? dateFns.format(this.props.calendarDay, "dddd") : "week"),
                categoryOptions: this.props.exerciseCategories
            }
            this.setState({
                plannedExerciseFormInitData: formInitData
            });
            this.togglePlannedExerciseForm();
        } else {
            const categories = this.props.plannedExercises.filter(function(plannedExercise) {
                return plannedExercise.planned_date === calendarDay && plannedExercise.planning_period === planningPeriod;
            });

            let requestBody;
            let existingPlannedExerciseId;
            for (let category of categories) {
                for (let exercise of category.exercises) {
                    if (exercise.exercise_type_id === id) {
                        existingPlannedExerciseId = exercise.id;
                        requestBody = JSON.stringify({ 
                            planning_period: planningPeriod,
                            recurrence: exercise.recurrence,
                            planned_date: calendarDay,
                            planned_sets: (exercise.planned_sets + 1),
                            planned_reps: exercise.planned_reps,
                            planned_seconds: exercise.planned_seconds
                        });
                    }
                }
            }
            
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
                    planning_period: planningPeriod,
                    recurrence: "weekly",
                    planned_date: calendarDay,
                    planned_reps: exerciseType.default_reps,
                    planned_seconds: exerciseType.default_seconds
                });
                console.log(requestBody);
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
                planning_period: values.planning_period,
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
                planning_period: values.planning_period,
                recurrence: values.recurrence,
                planned_date: dateFns.format(this.props.calendarDay, "YYYY-MM-DD")
            });
            this.props.plannedExerciseActions.addPlannedExercise(requestBody).then(result => {
                this.props.refresh(this.props.calendarDay);
                // we need to refresh buttons too
                this.props.activityTypeActions.loadActivityTypes();
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
        const dateFormatFull = "dddd DD MMMM YYYY";
        const dateFormatAbbrev = "ddd DD MMM YYYY";

        return (
            <div className="modal-back-drop">
                <div className="modal-wrapper">
                    <div className="calendar-modal-header">
                        <div className="d-none d-sm-inline">
                            <h4>
                                {this.props.selectionType === "week" && "Week of "}
                                {dateFns.format(this.props.calendarDay, dateFormatFull)}
                            </h4>
                        </div>
                        <div className="d-inline d-sm-none">
                            <h4>
                                {this.props.selectionType === "week" && "w/c "}
                                {dateFns.format(this.props.calendarDay, dateFormatAbbrev)}
                            </h4>
                        </div>
                        <span className="close-modal-btn" onClick={this.props.close}><i className="fa fa-window-close"></i></span>
                    </div>
                    <div className="calendar-modal-body">
                        <div>
                            {this.props.selectionType === "week" &&
                            <div className="alert alert-info text-left">These are activities and exercises that you can do on any day during the week. To add for a specific day click on that day in the calendar instead.</div>}
                            {this.state.showCalendarDayMain &&
                            <>
                                {this.props.selectionType === "day" &&
                                <>
                                <CompletedActivitiesList calendarDay={this.props.calendarDay} />
                                <PlannedRacesList calendarDay={this.props.calendarDay} onEdit={this.handleEditPlannedRace} onRemove={this.handleRemovePlannedRace} />
                                <CompletedExercisesList calendarDay={this.props.calendarDay} />
                                </>}
                                <PlannedActivitiesList planningPeriod={this.props.selectionType} calendarDay={this.props.calendarDay} onEdit={this.handleEditPlannedActivity} onRemove={this.handleRemovePlannedActivity} />
                                <PlannedExercisesList planningPeriod={this.props.selectionType} calendarDay={this.props.calendarDay} onEdit={this.handleEditPlannedExercise} onRemove={this.handleRemovePlannedExercise} />
                                {(this.state.isFutureDate || this.props.selectionType === "week") &&
                                <>
                                    <ActivityTypeButtonSet planningPeriod={this.props.selectionType} calendarDay={this.props.calendarDay} onAdd={this.handleAddPlannedActivity} onAddRace={this.handleAddPlannedRace} />
                                    <ExerciseTypeButtonSet calendarDay={this.props.calendarDay} onAdd={this.handleAddPlannedExercise} />
                                </>}
                            </>}
                            {this.state.showPlannedActivityForm &&
                            <PlannedActivityForm initData={this.state.plannedActivityFormInitData} onSubmit={this.handleSavePlannedActivity} handleBackClick={this.togglePlannedActivityForm} />}
                            {this.state.showPlannedRaceForm &&
                            <PlannedRaceForm initData={this.state.plannedRaceFormInitData} onSubmit={this.handleSavePlannedRace} handleBackClick={this.togglePlannedRaceForm} />}
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
        plannedRaceActions: bindActionCreators(plannedRaceActions, dispatch),
        plannedExerciseActions: bindActionCreators(plannedExerciseActions, dispatch),
        activityTypeActions: bindActionCreators(activityTypeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDayModal);