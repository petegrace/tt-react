import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class ActivitiesGoalForm extends Component {
    render() {
        const { handleSubmit, handleBackClick, initData } = this.props; 

        return (
            <form onSubmit={handleSubmit} className="form">
                <h4 className="mt-3 mb-3">Set Weekly Goal</h4>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="target_activities">Target Activities to Complete</label>
                    <Field component="input" type="text" className="form-control" id="target_activities" name="target_activities" />
                </div>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="min_distance">Of at least... ({initData.distance_uom_preference})</label>
                    <Field component="input" type="number" className="form-control" id="min_distance" name="min_distance" />
                </div>
                <button type="submit" className="btn btn-primary mr-1">Save Activity</button>
                <button type="button" className="btn btn-secondary" onClick={handleBackClick}>Back</button>
            </form>
        );
    };
}

ActivitiesGoalForm = reduxForm({
    form: "activitiesGoal"
})(ActivitiesGoalForm);

export default ActivitiesGoalForm;