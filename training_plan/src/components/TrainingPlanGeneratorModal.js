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
        const initData = {
            long_run_planning_period: "day",
            long_run_day: "Sun",
            other_runs_per_week: "0",
            other_runs_planning_period: "day"
        }
        this.props.initialize(initData);
    }

    handleRaceSelected = (event) => { 
        const targetRaceId = Number(event.target.value);
        const targetRace = filterPlannedRacesById(this.props.plannedRaces, targetRaceId);
        this.setState({
            targetRace: targetRace
        })
        if (targetRace) {
            this.props.trainingPlanGeneratorActions.loadTrainingPlanGeneratorInputs(targetRace.distance, targetRace.planned_date);
        }
    }

    handleGeneratePlanClick = (values) => {
        const requestBody = JSON.stringify({
            target_race_distance: this.state.targetRace.distance,
            target_race_date: this.state.targetRace.planned_date,
            long_run_planning_period: values.long_run_planning_period,
            long_run_day: values.long_run_day,
            other_runs_per_week: values.other_runs_per_week,
            other_runs_planning_period: values.other_runs_planning_period,
            other_run_days: values.other_run_days,
            other_run_types: values.other_run_types
        })
        this.props.trainingPlanGeneratorActions.addPlannedActivities(requestBody).then(result => {
            this.props.refresh(this.props.selectedDate);
        });
        this.props.close();
    }

    renderTargetRaceOption = (plannedRace) => {
        return (
            <option key={plannedRace.id} value={plannedRace.id}>{plannedRace.name} ({plannedRace.planned_date})</option>
        );
    }

    render() {
        const { user, trainingPlanGeneratorInputs } = this.props;
        const plannedRaces = this.props.plannedRaces;
        const targetRaceOptions = plannedRaces.map(this.renderTargetRaceOption);
        const runDayOptions = [
            {name: "Monday", value: "day1"},
            {name: "Tuesday", value: "day2"},
            {name: "Wednesday", value: "day3"},
            {name: "Thursday", value: "day4"},
            {name: "Friday", value: "day5"},
            {name: "Saturday", value: "day6"},
            {name: "Sunday", value: "day7"}
        ];
        const runTypeOptions = [
            {name: "Intervals / Fartlek", value: "intervals"},
            {name: "Tempo", value: "tempo"},
            {name: "Hills", value: "hills"}
        ];

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
                        <form onSubmit={this.props.handleSubmit(this.handleGeneratePlanClick)} className="form">
                            {/* Dropdown for user to select a race */}
                            <div className="form-group ">
                                <label className="form-control-label" htmlFor="target_race_id">Choose your target race</label>
                                <Field component="select" className="form-control" id="target_race_id" name="target_race_id" onChange={this.handleRaceSelected}>
                                    <option value="0">(Please select a race)</option>
                                    {targetRaceOptions}
                                </Field>
                            </div>
                            {targetRaceOptions.length === 0 &&
                            (<p>To use the Training Plan Generator you will first need to add a race to your calendar. Close this dialog and then click into the calendar on the date
                                of your target race to add the event. Make sure you specify the distance, and you'll then be able to select it as an option above.</p>)}
                            {this.state.targetRace && trainingPlanGeneratorInputs && (
                            <>
                            <h5>How we'll generate your plan</h5>
                            <p>
                                Your selected race is <span className="font-weight-bold">{this.state.targetRace.distance_formatted}</span> long.
                                Let's come up with a training plan for the remaining <span className="font-weight-bold">{trainingPlanGeneratorInputs.weeks_to_target_race}</span> weeks until the race,
                                given your activity from the last 4 weeks where you've averaged {trainingPlanGeneratorInputs.last_4_weeks.runs_per_week} runs per week with a longest run of {trainingPlanGeneratorInputs.last_4_weeks.longest_distance_formatted}.
                            </p>
                            {trainingPlanGeneratorInputs && trainingPlanGeneratorInputs.total_runs_above_target_distance > 1 && (
                            <>
                            <p>
                                You've done the distance for this race {trainingPlanGeneratorInputs.total_runs_above_target_distance} times before.
                                We'll look at the training you did before the {trainingPlanGeneratorInputs.current_pb.activity_name} on {trainingPlanGeneratorInputs.current_pb.activity_date} where you averaged {trainingPlanGeneratorInputs.current_pb.average_pace_formatted} and factor that into your suggested training plan.
                                The longest run you did leading up to that event was {trainingPlanGeneratorInputs.pre_pb_long_runs.longest_distance_formatted}.
                            </p>
                            </>)}
                            </>)}
                            {this.state.targetRace && (
                            <h5>Plan your long runs</h5>
                            )}
                            {this.state.targetRace && user && user.has_flexible_planning_enabled && (
                            <div className="form-group ">
                                <label className="form-control-label" htmlFor="long_run_planning_period">Would you like to choose a day for your long runs?</label>
                                <Field component="select" className="form-control" id="long_run_planning_period" name="long_run_planning_period">
                                    <option value="day">Yes, let me choose a specific day for my long runs</option>
                                    <option value="week">No, I'll be flexible about what day during the week to do my long runs</option>
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
                            {this.state.targetRace && (
                            <h5>Plan your other runs</h5>
                            )}
                            {this.state.targetRace && (
                            <div className="form-group ">
                                <label className="form-control-label" htmlFor="other_runs_per_week">How many other runs would you like to include each week (excluding your long run)?</label>
                                <Field component="select" className="form-control" id="other_runs_per_week" name="other_runs_per_week">
                                    <option value="0">None, I'll stick to just the long run</option>
                                    <option value="1">1 more run per week</option>
                                    <option value="2">2 more runs per week</option>
                                    <option value="3">3 more runs per week</option>
                                    <option value="4">4 more runs per week</option>
                                    <option value="5">5 more runs per week</option>
                                </Field>
                            </div>)}
                            {this.state.targetRace && this.props.otherRunsPerWeekValue !== "0" && user && user.has_flexible_planning_enabled && (
                            <div className="form-group ">
                                <label className="form-control-label" htmlFor="other_runs_planning_period">Would you like your remaining runs to be planned for specific days?</label>
                                <Field component="select" className="form-control" id="other_runs_planning_period" name="other_runs_planning_period">
                                    <option value="day">Yes, generate runs for specific days of the week</option>
                                    <option value="week">No, I'll be flexible about what days during the week to do my remaining runs</option>
                                </Field>
                            </div>)}
                            {this.state.targetRace && this.props.otherRunsPerWeekValue !== "0" && (!(user && user.has_flexible_planning_enabled) || this.props.otherRunsPlanningPeriodValue === "day") && (
                            <>
                            <p>What other days of the week are you able to run on?</p>
                            <div className="form-group row">
                                {runDayOptions.map(runDay => {
                                    return (
                                        <div key={runDay.value} className="col-4">
                                        <Field component="input" type="checkbox" name={`other_run_days.${runDay.value}`} />
                                        &nbsp;<label className="form-control-label" htmlFor={`other_run_days.${runDay.value}`}>{runDay.name}</label>
                                        </div>
                                    );
                                })}
                            </div>
                            </>
                            )}
                            {this.state.targetRace && this.props.otherRunsPerWeekValue > "1" && (
                            <>
                            <p>What types of run would you like to do aside from your long run and easy runs?</p>
                            <div className="form-group row">
                                {runTypeOptions.map(runType => {
                                    return (
                                        <div key={runType.value} className="col-4">
                                        <Field component="input" type="checkbox" name={`other_run_types.${runType.value}`} />
                                        &nbsp;<label className="form-control-label" htmlFor={`other_run_types.${runType.value}`}>{runType.name}</label>
                                        </div>
                                    );
                                })}
                            </div>
                            </>
                            )}
                            <button type="submit" className="btn btn-primary mr-1">Generate Plan</button>
                            <button type="button" className="btn btn-secondary" onClick={this.props.close}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

TrainingPlanGeneratorModal = reduxForm({
    form: "trainingPlanGenerator"
})(TrainingPlanGeneratorModal);

// we want access to other form values
const selector = formValueSelector("trainingPlanGenerator");
TrainingPlanGeneratorModal = connect(
    (state) => {
        const longRunPlanningPeriodValue = selector(state, "long_run_planning_period");
        const otherRunsPerWeekValue = selector(state, "other_runs_per_week");
        const otherRunsPlanningPeriodValue = selector(state, "other_runs_planning_period");
        return { longRunPlanningPeriodValue, otherRunsPerWeekValue, otherRunsPlanningPeriodValue };
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