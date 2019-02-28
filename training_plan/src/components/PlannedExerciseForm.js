import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";

class PlannedExerciseForm extends Component {

    componentDidMount() {
        const { initData } = this.props;
        this.props.initialize(initData);
    }

    renderCategorySelectOption = (categoryOption) => {
        return (
            <option key={categoryOption.id} value={categoryOption.id}>{categoryOption.category_name}</option>
        );
    }

    render() {
        const { handleSubmit, handleBackClick, initData } = this.props; 
        const badgeClass = "badge badge-primary " +  initData.category_key;
        let categorySelectOptions;

        if (initData.isNewExerciseType) {
            categorySelectOptions = initData.categoryOptions.map(this.renderCategorySelectOption);
        }

        return (
            <form onSubmit={handleSubmit} className="form">
                <h4 className="mt-3 mb-3">{initData.exercise_name} <span className={badgeClass}>{initData.category_name}</span></h4>
                {initData.isNewExerciseType && (
                    <>
                    <div className="form-group ">
                        <Field component={renderField} type="text" id="exercise_name" name="exercise_name" label="Exercise Name" />
                    </div>
                    <div className="form-group ">
                        <label className="form-control-label" htmlFor="measured_by">Measured By</label>
                        <Field component="select" className="form-control" id="measured_by" name="measured_by">
                            <option value="reps">Reps</option>
                            <option value="seconds">Time (seconds)</option>
                        </Field>
                    </div>
                    </>
                )}
                {((!this.props.measuredByValue && initData.measured_by === "reps") || this.props.measuredByValue === "reps") && (
                    <div className="form-group ">
                        <label className="form-control-label" htmlFor="planned_reps">Reps (per Set)</label>
                        <Field component="input" type="number" className="form-control" id="planned_reps" name="planned_reps" />
                    </div>
                )}
                {((!this.props.measuredByValue && initData.measured_by === "seconds") || this.props.measuredByValue === "seconds") && (
                    <div className="form-group ">
                        <label className="form-control-label" htmlFor="planned_seconds">Seconds (per Set)</label>
                        <Field component="input" type="number" className="form-control" id="planned_seconds" name="planned_seconds" />
                    </div>
                )}
                <div className="form-group ">
                    <Field component={renderField} type="number" id="planned_sets" name="planned_sets" label="Planned Sets" />
                </div>
                <div className="form-group ">
                    <label className="form-control-label" htmlFor="recurrence">Recurrence</label>
                    <Field component="select" className="form-control" id="recurrence" name="recurrence">
                        <option value="weekly">{initData.repeatOption}</option>
                        <option value="once">Once only</option>
                    </Field>
                </div>
                {initData.isNewExerciseType && initData.categoryOptions && (
                    <>
                    <div className="form-group ">
                        <label className="form-control-label" htmlFor="exercise_category_id">Category</label>
                        <Field component="select" className="form-control" id="exercise_category_id" name="exercise_category_id">
                            {categorySelectOptions}
                        </Field>
                    </div>
                    </>
                )}
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

// we want access to other form values
const selector = formValueSelector("plannedExercise");
PlannedExerciseForm = connect(
    (state) => {
        const measuredByValue = selector(state, 'measured_by')
        return { measuredByValue };
    }
)(PlannedExerciseForm)

export default PlannedExerciseForm;