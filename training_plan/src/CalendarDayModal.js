import React, { Component } from "react";
import dateFns from "date-fns";
import ls from "local-storage";

import "./CalendarDayModal.css";
import PlannedActivitiesList from "./PlannedActivitiesList"
import PlannedActivityForm from "./PlannedActivityForm";

class CalendarDayModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCalendarDayMain: true,
            showPlannedActivityForm: false
        }
    }

    togglePlannedActivityForm = () => {
        this.setState({
            showCalendarDayMain: !this.state.showCalendarDayMain,
            showPlannedActivityForm: !this.state.showPlannedActivityForm
        })
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
        const options = {
            method: "PATCH",
            headers: {
                "Authorization": authHeader,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                description: values.description,
                planned_distance: values.planned_distance
            }),
            mode: "cors"
        };
        const endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin); // todo: best means to manage this kind of thing?
        const endpoint = endpointOrigin + "/api/planned_activity/" + values.id;
        fetch(endpoint, options).then(r => {
            if (r.status === 204) {
                // only if we've successfully hit the API (which could have failed with some kind of server error)
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
                            {this.state.showCalendarDayMain &&
                            <PlannedActivitiesList calendarDay={this.props.calendarDay} onEdit={this.handleEditPlannedActivity} />}
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