import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class PlannedExerciseForm extends Component {

    componentDidMount() {
        const { initData } = this.props;
        this.props.initialize(initData);
    }

    render() {
        const { handleSubmit, handleBackClick, initData } = this.props; 
        const badgeClass = "badge badge-primary " +  initData.category_key;

        return (
            <form onSubmit={handleSubmit} className="form">
                <h4 className="mt-3 mb-3">{initData.exercise_name} <span className={badgeClass}>{initData.category_name}</span></h4>
                <div className="form-group ">
                    <Field component={renderField} type="number" id="planned_sets" name="planned_sets" label="Planned Sets" />
                </div>
                {initData.measured_by === "reps" && (
                    <div className="form-group ">
                        <label className="form-control-label" htmlFor="planned_reps">Reps (per Set)</label>
                        <Field component="input" type="number" className="form-control" id="planned_reps" name="planned_reps" />
                    </div>
                )}
                {initData.measured_by === "seconds" && (
                    <div className="form-group ">
                        <label className="form-control-label" htmlFor="planned_seconds">Seconds (per Set)</label>
                        <Field component="input" type="number" className="form-control" id="planned_seconds" name="planned_seconds" />
                    </div>
                )}
                <div className="mb-3">Repeats every {initData.recurrence}</div>
                <button type="submit" className="btn btn-primary mr-1">Save Exercise</button>
                <button type="button" className="btn btn-secondary" onClick={handleBackClick}>Back</button>
            </form>
        );
    };
}

const validate = (values) => {
    let errors = {};
    if (Number(values.planned_sets) <= 0) {
        errors.planned_sets = "Planned Sets must be at least 1."
    } 
    return errors;
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
        <div>
            <label className="form-control-label">{label}</label>
            <div>
            <input className="form-control" {...input} type={type}/>
            {touched && ((error && <div className="error mt-1">{error}</div>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
}

PlannedExerciseForm = reduxForm({
    form: "plannedExercise",
    validate
})(PlannedExerciseForm);

export default PlannedExerciseForm;