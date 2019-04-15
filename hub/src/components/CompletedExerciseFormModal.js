import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";

class CompletedExerciseFormModal extends Component {

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
        const { handleSubmit, initData } = this.props;
        let categorySelectOptions;

        if (initData.isNewExerciseType) {
            categorySelectOptions = initData.categoryOptions.map(this.renderCategorySelectOption);
        }

        return (
            <div className="modal-back-drop">
                <div className="modal-wrapper">
                    <div className="generic-modal-header">
                        <div className="d-inline">
                            <h4>Completed {initData.isNewExerciseType ? "New Exercise Type" : initData.exercise_name}</h4>
                        </div>
                        <span className="close-modal-btn" onClick={this.props.close}><i className="fa fa-window-close"></i></span>
                    </div>
                    <div className="generic-modal-body">
                        <p>{initData.exercise_datetime}</p>
                        <form onSubmit={handleSubmit} className="form">                            
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
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="reps">Reps</label>
                                    <Field component="input" type="number" className="form-control" id="reps" name="reps" />
                                </div>
                            )}
                            {((!this.props.measuredByValue && initData.measured_by === "seconds") || this.props.measuredByValue === "seconds") && (
                                <div className="form-group">
                                    <label className="form-control-label" htmlFor="seconds">Seconds</label>
                                    <Field component="input" type="number" className="form-control" id="seconds" name="seconds" />
                                </div>
                            )}
                            {initData.isNewExerciseType && initData.categoryOptions && initData.categoryOptions.length > 0 && (
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
                            <button type="button" className="btn btn-secondary" onClick={this.props.close}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
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

CompletedExerciseFormModal = reduxForm({
    form: "completedExercise"
})(CompletedExerciseFormModal);

// we want access to other form values
const selector = formValueSelector("completedExercise");
CompletedExerciseFormModal = connect(
    (state) => {
        const measuredByValue = selector(state, "measured_by")
        return { measuredByValue };
    }
)(CompletedExerciseFormModal)

export default CompletedExerciseFormModal;