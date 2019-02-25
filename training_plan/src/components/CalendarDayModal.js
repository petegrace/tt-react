import React, { Component } from "react";
import dateFns from "date-fns";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./CalendarDayModal.css";
import ActivityTypeButtonSet from "./ActivityTypeButtonSet";
import PlannedActivitiesList from "./PlannedActivitiesList";
import PlannedExercisesList from "./PlannedExercisesList";
import PlannedActivityForm from "./PlannedActivityForm";
import * as plannedActivityActions from "../actions/plannedActivityActions";
import * as plannedExerciseActions from "../actions/plannedExerciseActions";

class CalendarDayModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCalendarDayMain: true,
            showPlannedActivityForm: false,
            isFutureDate: (props.calendarDay >= dateFns.startOfDay(new Date())),
            plannedActivities: props.plannedActivities
        }
    }

    togglePlannedActivityForm = () => {
        this.setState({
            showCalendarDayMain: !this.state.showCalendarDayMain,
            showPlannedActivityForm: !this.state.showPlannedActivityForm
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
    };
    
    // todo: refactor the remove handling to be done here instead of in the presentational component

    // CRUD operations for planned exercises
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
                            <PlannedExercisesList calendarDay={this.props.calendarDay} onRemove={this.handleRemovePlannedExercise} />
                            <ActivityTypeButtonSet calendarDay={this.props.calendarDay} onAdd={this.handleAddPlannedActivity} />
                            </>}
                            {this.state.showPlannedActivityForm &&
                            <PlannedActivityForm initData={this.state.plannedActivityFormInitData} onSubmit={this.handleSavePlannedActivity} handleBackClick={this.togglePlannedActivityForm} />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        plannedActivityActions: bindActionCreators(plannedActivityActions, dispatch),
        plannedExerciseActions: bindActionCreators(plannedExerciseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDayModal);