import React, { Component } from "react";
import dateFns from "date-fns";
import ls from "local-storage";

import "./CalendarDayModal.css";
import ActivityTypeButtonSet from "./ActivityTypeButtonSet";
import PlannedActivitiesList from "./PlannedActivitiesList";
import PlannedActivityForm from "./PlannedActivityForm";

class CalendarDayModal extends Component {
    constructor(props) {
        super(props);

        // todo: should refactor to use redux
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
        // TODO: refactor all of these API calls into a middleware layer
        const accessToken = ls.get("accessToken");
        const authHeader = "Bearer " + accessToken;
        let endpoint;

        let options = {
            method: null,
            headers: {
                "Authorization": authHeader,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                activity_type: values.activity_type,
                planned_date: values.planned_date,
                description: values.description,
                planned_distance: values.planned_distance
            }),
            mode: "cors"
        };
        const endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin); // todo: best means to manage this kind of thing?
        
        if (values.id) {
            options.method = "PATCH";
            endpoint = endpointOrigin + "/api/planned_activity/" + values.id;
        } else {
            options.method = "POST";
            endpoint = endpointOrigin + "/api/planned_activities";
        }
        fetch(endpoint, options).then(r => {
            if (r.status === 201 || r.status === 204) {
                // only if we've successfully hit the API (which could have failed with some kind of server error)
                this.props.refresh(this.props.calendarDay);
                this.setState({
                    plannedActivities: this.props.filter(this.props.calendarDay)
                });
                this.togglePlannedActivityForm();
            }
        });

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
                            <PlannedActivitiesList calendarDay={this.props.calendarDay} plannedActivities={this.state.plannedActivities} onEdit={this.handleEditPlannedActivity} />
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

export default CalendarDayModal;