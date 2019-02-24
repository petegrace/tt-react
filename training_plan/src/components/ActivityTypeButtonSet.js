import React, { Component } from "react";
import dateFns from "date-fns";
import ls from "local-storage";

class ActivityTypeButtonSet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "activity_types": []
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
        const endpoint = endpointOrigin + "/api/activity_types";
        console.log(endpoint);
        fetch(endpoint, options).then(r => {
            r.json().then(response => {
                this.setState(response);
            });
        });
    }
    
    handleAddActivity = (formInitData) => {
        this.props.onAdd(formInitData)
    }

    renderActivityTypeButton = (activityType) => {
        const buttonClass = "btn btn-sm ml-1 mr-1 " + activityType.category_key;
        const formInitData = {
            activity_type: activityType.activity_type,
            category_key: activityType.category_key,
            planned_date: dateFns.format(this.props.calendarDay, "YYYY-MM-DD"),
            recurrence: "Repeats every " + dateFns.format(this.props.calendarDay, "dddd")
        }

        return (
            <button key={activityType.activity_type} className={buttonClass} onClick={() => this.handleAddActivity(formInitData)}>
                <i className="fa fa-calendar-plus-o"></i> {activityType.activity_type}
                <br />
                <small>&nbsp;</small>
			</button>
        );
    }

    render() {
        let activityTypes = this.state.activity_types;
        let activityTypeButtons = activityTypes.map(this.renderActivityTypeButton);
        return(
            <>
            <h3>Add Activities</h3>
            {activityTypeButtons}
            </>
        );
    }
}

export default ActivityTypeButtonSet;