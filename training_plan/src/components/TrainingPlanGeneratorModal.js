import React, { Component } from "react";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as trainingPlanGeneratorActions from "../actions/trainingPlanGeneratorActions";
import { filterPlannedRacesById } from "../helpers/trainingPlan";

class TrainingPlanGeneratorModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            targetRace: null
        };
    }

    componentDidMount() {
        const { initData } = this.props;
        this.props.initialize(initData);
    }

    handleRaceSelected = (event) => { 
        const targetRaceId = Number(event.target.value);
        const targetRace = filterPlannedRacesById(this.props.plannedRaces, targetRaceId);
        this.setState({
            targetRace: targetRace
        })
        console.log(targetRace);
        this.props.trainingPlanGeneratorActions.loadTrainingPlanGeneratorInputs(targetRace.distance, targetRace.planned_date).then(
            () => { console.log(this.props.trainingPlanGeneratorInputs); }
        );
    }

    renderTargetRaceOption = (plannedRace) => {
        return (
            <option key={plannedRace.id} value={plannedRace.id}>{plannedRace.name} ({plannedRace.planned_date})</option>
        );
    }

    render() {
        const { handleSubmit, initData, user, trainingPlanGeneratorInputs } = this.props;
        const plannedRaces = this.props.plannedRaces;
        const targetRaceOptions = plannedRaces.map(this.renderTargetRaceOption);

        return (
            <div className="modal-back-drop">
                <div className="modal-wrapper">
                    <div className="generic-modal-header">
                        <div className="d-inline">
                            <h4>Generate Training Plan</h4>
                        </div>
                        <span className="close-modal-btn" onClick={this.props.close}><i className="fa fa-window-close"></i></span>
                    </div>
                    <div className="generic-modal-body">
                        <form onSubmit={handleSubmit} className="form">
                            {/* Dropdown for user to select a race */}
                            <div className="form-group ">
                                <label className="form-control-label" htmlFor="target_race_id">Choose your target race</label>
                                <Field component="select" className="form-control" id="target_race_id" name="target_race_id" onChange={this.handleRaceSelected}>
                                    <option value="0">(Please select a race)</option>
                                    {targetRaceOptions}
                                </Field>
                            </div>
                            {this.state.targetRace && trainingPlanGeneratorInputs && (
                            <p>
                                Your selected race is <span className="font-weight-bold">{this.state.targetRace.distance_formatted}</span> long.
                                Let's come up with a training plan for the remaining <span className="font-weight-bold">{trainingPlanGeneratorInputs.weeks_to_target_race}</span> weeks until the race.
                            </p>)}
                            {this.state.targetRace && user && user.has_flexible_planning_enabled && (
                            <div className="form-group ">
                                <label className="form-control-label" htmlFor="long_run_planning_period">First, let's plan your long runs...</label>
                                <Field component="select" className="form-control" id="long_run_planning_period" name="long_run_planning_period">
                                    <option value="week">I'll be flexible about what day during the week to do my long runs</option>
                                    <option value="day">Let me choose a specific day for my long runs</option>
                                </Field>
                            </div>)}
                            {this.state.targetRace && (!(user && user.has_flexible_planning_enabled) || this.props.longRunPlanningPeriodValue === "day") && (
                            <div className="form-group ">
                                <label className="form-control-label" htmlFor="long_run_day">Choose a day for your long run</label>
                                <Field component="select" className="form-control" id="long_run_day" name="long_run_day">
                                    <option value="Mon">Monday</option>
                                    <option value="Tue">Tuesday</option>
                                    <option value="Wed">Wednesday</option>
                                    <option value="Thu">Thursday</option>
                                    <option value="Fri">Friday</option>
                                    <option value="Sat">Saturday</option>
                                    <option value="Sun">Sunday</option>
                                </Field>
                            </div>)}
                            {trainingPlanGeneratorInputs && trainingPlanGeneratorInputs.total_runs_above_target_distance > 1 && (
                            <p>
                                You've done the distance for this race <span className="font-weight-bold">{trainingPlanGeneratorInputs.total_runs_above_target_distance} times</span> before.
                                We'll look at the training you did before the <span className="font-weight-bold">{trainingPlanGeneratorInputs.current_pb.activity_name} on {trainingPlanGeneratorInputs.current_pb.activity_date}</span> where you averaged <span className="font-weight-bold">{trainingPlanGeneratorInputs.current_pb.average_pace_formatted}</span> and factor that into your suggested training plan.
                            </p>)}
                            <button type="submit" className="btn btn-primary mr-1">Generate Plan</button>
                            <button type="button" className="btn btn-secondary" onClick={this.props.close}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
//     return (
//         <div>
//             <label className="form-control-label">{label}</label>
//             <div>
//             <input className="form-control" {...input} type={type}/>
//             {touched && ((error && <div className="error mt-1">{error}</div>) || (warning && <span>{warning}</span>))}
//             </div>
//         </div>
//     );
// }

TrainingPlanGeneratorModal = reduxForm({
    form: "trainingPlanGenerator"
})(TrainingPlanGeneratorModal);

// we want access to other form values
const selector = formValueSelector("trainingPlanGenerator");
TrainingPlanGeneratorModal = connect(
    (state) => {
        const longRunPlanningPeriodValue = selector(state, "long_run_planning_period")
        return { longRunPlanningPeriodValue };
    }
)(TrainingPlanGeneratorModal)
 
function mapStateToProps(state) {
    return {
        user: state.user,
        plannedRaces: state.plannedRaces,
        trainingPlanGeneratorInputs: state.trainingPlanGeneratorInputs
    };
}

function mapDispatchToProps(dispatch) {
    return {
        trainingPlanGeneratorActions: bindActionCreators(trainingPlanGeneratorActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainingPlanGeneratorModal);