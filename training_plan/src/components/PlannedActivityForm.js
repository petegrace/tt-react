import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class PlannedActivityForm extends Component {

    componentDidMount() {
        const { initData } = this.props;
        this.props.initialize(initData);
    }

    render() {
        const { handleSubmit, handleBackClick, initData } = this.props; 
        const badgeClass = "badge badge-primary " +  initData.category_key;

        return (
            <form onSubmit={handleSubmit} className="form">
                <h4 className="mt-3 mb-3"><small>Activity Type:</small> <span className={badgeClass}>{initData.activity_type}</span></h4>
                <div className="form-group ">
                    <label className="form-control-label" htmlFor="description">Description</label>
                    <Field component="input" type="text" className="form-control" id="description" name="description" placeholder="(optional)" />
                </div>
                <div className="form-group ">
                    <label className="form-control-label" htmlFor="planned_distance">Planned Distance (km)</label>
                    <Field component="input" type="number" className="form-control" id="planned_distance" name="planned_distance" placeholder="(optional)" />
                </div>
                <div className="mb-3">{initData.recurrence}</div>
                <button type="submit" className="btn btn-primary mr-1">Save Activity</button>
                <button type="button" className="btn btn-secondary" onClick={handleBackClick}>Back</button>
            </form>
        );
    };
}

PlannedActivityForm = reduxForm({
    form: "plannedActivity"
})(PlannedActivityForm);

export default PlannedActivityForm;