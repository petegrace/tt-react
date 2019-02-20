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

    handleRemoveActivity = (key) => {
        let filteredActivities = this.state.planned_activities.filter(function(plannedActivity) {
            return plannedActivity.id != key;
        });

        this.setState({
            "planned_activities": filteredActivities
        })

        // const authHeader = "Bearer " + accessToken;
        // const options = {
        //     method: "GET",
        //     headers: {
        //         "Authorization": authHeader
        //     }
        // };
        // const endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
        // const dateFormat = "YYYY-MM-DD";
        // const endpoint = endpointOrigin + "/api/planned_activities?startDate=" + dateFns.format(this.props.calendarDay, dateFormat);
        // console.log(endpoint);
        // fetch(endpoint, options).then(r => {
        //     r.json().then(response => {
        //         this.setState(response);
        //     });
        // });
    }

    createPlannedActivityRow = (plannedActivity) => {
        const badgeClass = "badge badge-primary " +  plannedActivity.category_key;

        return (
            <tr key={plannedActivity.id}>
                <td><h4><span className={badgeClass}>{plannedActivity.activity_type}</span></h4></td>
                <td>{plannedActivity.planned_distance}</td>
                <td>{plannedActivity.description}</td>
                <td>Repeats every {dateFns.format(this.props.calendarDay, "dddd")}</td>
                <td>
                    <ul className="nav justify-content-end">
                        <li className="nav-item mr-5">
                            {/* TODO: link to toggle visibility: <i className="fa fa-edit"></i> Edit</NavLink> */}
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
                    <p>Activity 1 - Social run - 10k - One-off - Invite others</p>
                </div>
        );
    }
}

export default PlannedActivitiesList;