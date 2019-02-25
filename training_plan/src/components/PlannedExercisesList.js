import React, { Component } from "react";
import { connect } from "react-redux";
import dateFns from "date-fns";

import { filterPlannedExercises } from "../helpers/trainingPlan";
// import * as plannedExerciseActions from "../actions/plannedActivityActions";

class PlannedExercisesList extends Component {

    renderPlannedExerciseRow = (plannedExercise) => {
        const badgeClass = "badge badge-primary " +  plannedExercise.category_key;

        return (
            <tr key={plannedExercise.id}>
                <td><h5><span className={badgeClass}>{plannedExercise.exercise_name}</span></h5></td>
                <td>{plannedExercise.planned_sets ? plannedExercise.planned_sets + " sets" : ""}</td>
                {plannedExercise.measured_by === "reps" && (
                    <td>{plannedExercise.planned_reps ? plannedExercise.planned_reps + " reps" : ""}</td>
                )}
                {plannedExercise.measured_by === "seconds" && (
                    <td>{plannedExercise.planned_seconds ? plannedExercise.planned_seconds + " secs" : ""}</td>
                )}
                <td>Repeats every {dateFns.format(this.props.calendarDay, "dddd")}</td>
                <td>
                    <ul className="nav justify-content-end">
                        <li className="nav-item mr-5">
                            <a href="#" role="button" onClick={() => {return true;}}><i className="fa fa-edit"></i> Edit</a>
                        </li>
                        <li className="nav-item mr-5">
                            <a href="#" role="button" onClick={() => this.props.onRemove(plannedExercise.id)}><i className="fa fa-trash"></i> Remove</a>
                        </li>
                    </ul>
                </td>
            </tr>
        );
    }
    
    render() {
        const plannedExerciseCategories = filterPlannedExercises(this.props.plannedExercises, this.props.calendarDay);
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