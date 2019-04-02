import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class PlannedRaceForm extends Component {

    componentDidMount() {
        const { initData } = this.props;
        this.props.initialize(initData);
    }

    render() {
        const { handleSubmit, handleBackClick, initData } = this.props; 

        return (
            <form onSubmit={handleSubmit} className="form">
                <h4 className="mt-3 mb-3">New Planned Race</h4>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="name">Name of Race</label>
                    <Field component="input" type="text" className="form-control" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="race_type">Race Type</label>
                    <Field component="select" className="form-control" id="race_type" name="race_type">
                        <option value="Run">Run</option>
                        <option value="Ride">Ride</option>
                        <option value="Swim">Swim</option>
                        <option value="Triathlon">Triathlon</option>
                        <option value="Duathlon">Duathlon</option>
                    </Field>
                </div>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="distance">Distance ({initData.distance_uom_preference})</label>
                    <Field component="input" type="number" className="form-control" id="distance" name="distance" placeholder="(optional)" />
                </div>
                <div className="form-group">
                    <label className="form-control-label" htmlFor="notes">Notes</label>
                    <Field component="input" type="text" className="form-control" id="notes" name="notes" placeholder="(optional)" />
                </div>
                <button type="submit" className="btn btn-primary mr-1">Save Race</button>
                <button type="button" className="btn btn-secondary" onClick={handleBackClick}>Back</button>
            </form>
        );
    };
}

PlannedRaceForm = reduxForm({
    form: "plannedRace"
})(PlannedRaceForm);

export default PlannedRaceForm;