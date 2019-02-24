import React, { Component } from "react";
import dateFns from "date-fns";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./CalendarDayModal.css";
import ActivityTypeButtonSet from "./ActivityTypeButtonSet";
import PlannedActivitiesList from "./PlannedActivitiesList";
import PlannedActivityForm from "./PlannedActivityForm";
import * as plannedActivityActions from "../actions/plannedActivityActions";

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
            console.log("IN THE PATCH!");
            this.props.actions.updatePlannedActivity(values.id, requestBody);
            this.props.refresh(this.props.calendarDay);
        } else {
            console.log("POST will go here")
            // todo: post
            // options.method = "POST";
            // endpoint = endpointOrigin + "/api/planned_activities";
        }
        this.togglePlannedActivityForm();
        // fetch(endpoint, options).then(r => {
        //     if (r.status === 201 || r.status === 204) {
        //         // only if we've successfully hit the API (which could have failed with some kind of server error)
        //         this.props.refresh(this.props.calendarDay);
        //         this.setState({
        //             plannedActivities: this.props.filter(this.props.calendarDay)
        //         });
        //         this.togglePlannedActivityForm();
        //     }
        // });

    };

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
        actions: bindActionCreators(plannedActivityActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDayModal);