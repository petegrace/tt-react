import React, { Component } from "react";
import { connect } from "react-redux";
import dateFns from "date-fns";

import { filterCompletedExercises } from "../helpers/trainingPlan";

class CompletedExercisesList extends Component {

    renderCompletedExerciseRow = (completedExercise) => {
        const badgeClass = "badge badge-primary " +  completedExercise.category_key;

        return (
            <tr key={completedExercise.id}>
                <td className="name-badge">
                <div className="d-none d-sm-inline">
                    <h5><span className={badgeClass}>
                        {completedExercise.exercise_name}
                    </span></h5>
                </div>
                <div className="d-inline d-sm-none">
                    <h5><span className={badgeClass}>
                        {completedExercise.exercise_name.length <= 30 ? completedExercise.exercise_name : completedExercise.exercise_name.substring(0,27) + "..." }
                    </span></h5>
                </div>
                </td>
                <td>{completedExercise.exercise_time}</td>
                {completedExercise.measured_by === "reps" && (
                    <td>{completedExercise.reps ? completedExercise.reps + " reps" : ""}</td>
                )}
                {completedExercise.measured_by === "seconds" && (
                    <td>{completedExercise.seconds ? completedExercise.seconds + " secs" : ""}</td>
                )}
            </tr>
        );
    }
   
    render() {
        const completedExerciseCategories = filterCompletedExercises(this.props.completedExercises, this.props.calendarDay);
        let completedExerciseRows = [];
        for (let completedExerciseCategory of completedExerciseCategories) {
            completedExerciseRows.push(completedExerciseCategory.exercises.map(this.renderCompletedExerciseRow));
        }
        return (
                <div>
                    {completedExerciseCategories.length > 0 && (
                        <>
                        <h3>Completed Exercises</h3>
                        <table className="table table-sm table-hover mt-3">
                            <tbody>
                            {completedExerciseRows}
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
        completedExercises: state.completedExercises
    };
}

CompletedExercisesList = connect(mapStateToProps)(CompletedExercisesList)

export default CompletedExercisesList;