import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { filterPlannedActivitiesById } from "../helpers/trainingPlan";

class PlannedActivityForm extends Component {

    componentDidMount() {
        const plannedActivity = filterPlannedActivitiesById(this.props.plannedActivities, this.props.plannedActivityId);
        const initData = {
            id: plannedActivity.id,
            activity_type: plannedActivity.activity_type,
            category_key: plannedActivity.category_key,
            planned_date: plannedActivity.planned_date,
            description: plannedActivity.description,
            planned_distance: plannedActivity.planned_distance,
            recurrence: "Repeats every " + plannedActivity.scheduled_day
        };
        this.props.initialize(initData);
        console.log(this.props);
    }

    render() {
        const { handleSubmit, handleBackClick } = this.props; 
        const plannedActivity = filterPlannedActivitiesById(this.props.plannedActivities, this.props.plannedActivityId); // could this just go into constructor as a normal attribute?
        const badgeClass = "badge badge-primary " +  plannedActivity.category_key;

        return (
            <form onSubmit={handleSubmit} className="form">
                <h4 className="mt-3 mb-3"><small>Activity Type:</small> <span className={badgeClass}>Run</span></h4>
                <div className="form-group ">
                    <label className="form-control-label" htmlFor="description">Description</label>
                    <Field component="input" type="text" className="form-control" id="description" name="description" placeholder="(optional)" />
                </div>
                <div className="form-group ">
                    <label className="form-control-label" htmlFor="planned_distance">Planned Distance (km)</label>
                    <Field component="input" type="number" className="form-control" id="planned_distance" name="planned_distance" placeholder="(optional)" />
                </div>
                <div className="mb-3">Repeats every Thu</div>
                <button type="submit" className="btn btn-primary mr-1">Save Activity</button>
                <button type="button" className="btn btn-secondary" onClick={handleBackClick}>Back</button>
            </form>
        );
    };
}

function mapStateToProps(state) {
    return {
        plannedActivities: state.plannedActivities
    };
}

PlannedActivityForm = connect(mapStateToProps)(reduxForm({
    form: "plannedActivity"
})(PlannedActivityForm));

export default PlannedActivityForm;