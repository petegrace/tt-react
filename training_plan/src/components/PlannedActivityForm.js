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
                {initData.activity_type === "Run" && (
                <div className="form-group ">
                    <label className="form-control-label" htmlFor="activity_subtype">Run Type</label>
                    <Field component="select" className="form-control" id="activity_subtype" name="activity_subtype">
                        <option value="">(optional)</option>
                        <option value="Long Run">Long Run</option>
                        <option value="Easy / Social Run">Easy / Social Run</option>
                        <option value="Intervals / Fartlek">Intervals / Fartlek</option>
                        <option value="Tempo Run">Tempo Run</option>
                        <option value="Hilly Run">Hilly Run</option>
                        <option value="Trail Run">Trail Run</option>
                    </Field>
                </div>)}
                <div className="form-group ">
                    <label className="form-control-label" htmlFor="recurrence">Recurrence</label>
                    <Field component="select" className="form-control" id="recurrence" name="recurrence">
                        <option value="once">Once only</option>
                        <option value="weekly">{initData.repeatOption}</option>
                    </Field>
                </div>
                <div className="form-group ">
                    <label className="form-control-label" htmlFor="description">Description</label>
                    <Field component="input" type="text" className="form-control" id="description" name="description" placeholder="(optional)" />
                </div>
                <div className="form-group ">
                    <label className="form-control-label" htmlFor="planned_distance">Planned Distance ({initData.distance_uom_preference})</label>
                    <Field component="input" type="number" className="form-control" id="planned_distance" name="planned_distance" placeholder="(optional)" />
                </div>
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