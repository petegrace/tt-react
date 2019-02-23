import React, { Component } from "react";
import dateFns from "date-fns";
import ls from "local-storage";

class PlannedActivitiesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "planned_activities": []
        };
    }

    componentDidMount() {
        const accessToken = ls.get("accessToken");
        const authHeader = "Bearer " + accessToken;
        const options = {
            method: "GET",
            headers: {
                "Authorization": authHeader
            }
        };
        const endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
        const dateFormat = "YYYY-MM-DD";
        const endpoint = endpointOrigin + "/api/planned_activities?startDate=" + dateFns.format(this.props.calendarDay, dateFormat);
        console.log(endpoint);
        fetch(endpoint, options).then(r => {
            r.json().then(response => {
                this.setState(response);
            });
        });
    }

    handleRemoveActivity = (activityId) => {
        let filteredActivities = this.state.planned_activities.filter(function(plannedActivity) {
            return plannedActivity.id !== activityId;
        });

        const accessToken = ls.get("accessToken");
        const authHeader = "Bearer " + accessToken;
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": authHeader
            }
        };
        const endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin); // todo: best means to manage this kind of thing?
        const endpoint = endpointOrigin + "/api/planned_activity/" + activityId;
        console.log(endpoint);
        fetch(endpoint, options).then(r => {
            if (r.status === 204) {
                // only we've successfully hit the API (which could have failed with some kind of server error)
                this.setState({
                    "planned_activities": filteredActivities
                })
            }
        });        
    }
    
    handleEditActivity = (formInitData) => {
        this.props.onEdit(formInitData)
    }

    createPlannedActivityRow = (plannedActivity) => {
        const badgeClass = "badge badge-primary " +  plannedActivity.category_key;
        const formInitData = {
            id: plannedActivity.id,
            activity_type: plannedActivity.activity_type,
            category_key: plannedActivity.category_key,
            description: plannedActivity.description,
            planned_distance: plannedActivity.planned_distance,
            planned_date: dateFns.format(this.props.calendarDay, "YYYY-MM-DD"),
            recurrence: "Repeats every " + dateFns.format(this.props.calendarDay, "dddd")
        }

        return (
            <tr key={plannedActivity.id}>
                <td><h4><span className={badgeClass}>{plannedActivity.activity_type}</span></h4></td>
                <td>{plannedActivity.planned_distance ? plannedActivity.planned_distance + " km" : ""}</td>
                <td>{plannedActivity.description}</td>
                <td>Repeats every {dateFns.format(this.props.calendarDay, "dddd")}</td>
                <td>
                    <ul className="nav justify-content-end">
                        <li className="nav-item mr-5">
                            <a href="#" role="button" onClick={() => this.handleEditActivity(formInitData)}><i className="fa fa-edit"></i> Edit</a>
                        </li>
                        <li className="nav-item mr-5">
                            <a href="#" role="button" onClick={() => this.handleRemoveActivity(plannedActivity.id)}><i className="fa fa-trash"></i> Remove</a>
                        </li>
                    </ul>
                </td>
            </tr>
        );
    }

    render() {
        let plannedActivities = this.state.planned_activities;
        let plannedActivityRows = plannedActivities.map(this.createPlannedActivityRow);

        return (
                <div>
                    {plannedActivities.length > 0 && (
                        <>
                        <h3>Planned Activities</h3>
                        <table className="table table-sm table-hover mt-3">
                            <tbody>
                            {plannedActivityRows}
                            </tbody>
                        </table>
                        </>
                    )}
                </div>
        );
    }
}

export default PlannedActivitiesList;