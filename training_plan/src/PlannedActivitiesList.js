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
        const endpoint = endpointOrigin + "/api/planned_activities/" + dateFns.format(this.props.calendarDay, dateFormat);
        fetch(endpoint, options).then(r => {
            r.json().then(response => {
                this.setState(response);
            });
        });
    }

    render() {
        return (
            <p>Activity 1 - Social run - 10k - One-off - Invite others</p>
        );
    }
}

export default PlannedActivitiesList;