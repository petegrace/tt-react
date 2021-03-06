import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import dateFns from "date-fns";

import { filterPlannedExercises } from "../helpers/trainingPlan";
// import * as plannedExerciseActions from "../actions/plannedActivityActions";

class PlannedExercisesList extends Component {

    renderPlannedExerciseRow = (plannedExercise) => {
        const badgeClass = "badge badge-primary " +  plannedExercise.category_key;
        const formInitData = {
            id: plannedExercise.id,
            exercise_name: plannedExercise.exercise_name,
            category_name: plannedExercise.category_name,
            category_key: plannedExercise.category_key,
            planned_sets: plannedExercise.planned_sets,
            measured_by: plannedExercise.measured_by,
            planned_reps: plannedExercise.planned_reps,
            planned_seconds: plannedExercise.planned_seconds,
            recurrence: plannedExercise.recurrence,
            planned_date: dateFns.format(this.props.calendarDay, "YYYY-MM-DD"),
            repeatOption: "Repeat every " + (plannedExercise.planning_period === "day" ? dateFns.format(this.props.calendarDay, "dddd") : "week"),
        }

        return (
            <tr key={plannedExercise.id}>
                <td className="name-badge">
                <div className="d-none d-sm-inline">
                    <h5><span className={badgeClass}>
                        {plannedExercise.exercise_name}
                    </span></h5>
                </div>
                <div className="d-inline d-sm-none">
                    <h5><span className={badgeClass}>
                        {plannedExercise.exercise_name.length <= 20 ? plannedExercise.exercise_name : plannedExercise.exercise_name.substring(0,17) + "..." }
                    </span></h5>
                </div>
                </td>
                <td>{plannedExercise.planned_sets ? plannedExercise.planned_sets + " sets" : ""}</td>
                {plannedExercise.measured_by === "reps" && (
                    <td>{plannedExercise.planned_reps ? plannedExercise.planned_reps + " reps" : ""}</td>
                )}
                {plannedExercise.measured_by === "seconds" && (
                    <td>{plannedExercise.planned_seconds ? plannedExercise.planned_seconds + " secs" : ""}</td>
                )}
                <td>
                    <div className="d-none d-sm-inline">
                        {plannedExercise.recurrence === "once" && "Once only"}
                        {plannedExercise.recurrence === "weekly" && <>Repeats every {this.props.planningPeriod === "day" ? dateFns.format(this.props.calendarDay, "dddd") : "week"}</>}
                    </div>
                    <div className="d-inline d-sm-none">
                        {plannedExercise.recurrence === "once" && "Once"}
                        {plannedExercise.recurrence === "weekly" && "Weekly"}
                    </div>
                </td>
                <td className="actions">
                    <ul className="nav justify-content-end">
                        <li className="nav-item mr-3">
                            <a href="#edit" role="button" onClick={() => this.props.onEdit(formInitData)}><i className="fa fa-edit"></i></a>
                        </li>
                        <Dropdown as="li" className="nav-item">
                            <Dropdown.Toggle as="a" cole="button" href="#" bsPrefix="none"><i className="fa fa-trash"></i></Dropdown.Toggle>
                            <Dropdown.Menu alignRight="true">
                                {plannedExercise.recurrence === "once" &&
                                <Dropdown.Item href="#" role="button" onClick={() => this.props.onRemove(plannedExercise.id, "all")}>Remove from plan</Dropdown.Item>}
                                {plannedExercise.recurrence === "weekly" &&
                                <>
                                <Dropdown.Item href="#" role="button" onClick={() => this.props.onRemove(plannedExercise.id, dateFns.format(this.props.calendarDay, "YYYY-MM-DD"))}>Remove for this {this.props.planningPeriod}</Dropdown.Item>
                                <Dropdown.Item href="#" role="button" onClick={() => this.props.onRemove(plannedExercise.id, "all")}>Remove for all weeks</Dropdown.Item>
                                </>}
                            </Dropdown.Menu>
                        </Dropdown>
                    </ul>
                </td>
            </tr>
        );
    }
   
    render() {
        const plannedExerciseCategories = filterPlannedExercises(this.props.plannedExercises, this.props.calendarDay, this.props.planningPeriod);
        let plannedExerciseRows = [];
        for (let plannedExerciseCategory of plannedExerciseCategories) {
            plannedExerciseRows.push(plannedExerciseCategory.exercises.map(this.renderPlannedExerciseRow));
        }
        return (
                <div>
                    {plannedExerciseCategories.length > 0 && (
                        <>
                        <h3>Planned Exercises</h3>
                        <table className="table table-sm table-hover mt-3">
                            <tbody>
                            {plannedExerciseRows}
                            </tbody>
                        </table>
                        </>
                    )}
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        plannedExercises: state.plannedExercises
    };
}

PlannedExercisesList = connect(mapStateToProps)(PlannedExercisesList)

export default PlannedExercisesList;