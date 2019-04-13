import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

class CompletedExerciseFormModal extends Component {

    componentDidMount() {
        const { initData } = this.props;
        this.props.initialize(initData);
    }

    render() {
        const { handleSubmit, initData } = this.props;

        return (
            <div className="modal-back-drop">
                <div className="modal-wrapper">
                    <div className="generic-modal-header">
                        <div className="d-inline">
                            <h4>Completed {initData.exercise_name}</h4>
                        </div>
                        <span className="close-modal-btn" onClick={this.props.close}><i className="fa fa-window-close"></i></span>
                    </div>
                    <div className="generic-modal-body">
                        <p>{initData.exercise_datetime}</p>
                        <form onSubmit={handleSubmit} className="form">
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
                            <button type="submit" className="btn btn-primary mr-1">Save Exercise</button>
                            <button type="button" className="btn btn-secondary" onClick={this.props.close}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

CompletedExerciseFormModal = reduxForm({
    form: "completedExercise"
})(CompletedExerciseFormModal);

export default CompletedExerciseFormModal;