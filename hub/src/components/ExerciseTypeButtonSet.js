import React, { Component } from "react";
import { connect } from "react-redux";

class ExerciseTypeButtonSet extends Component {

    renderExerciseTypeButton = (exerciseType) => {
        const buttonClass = "btn btn-sm ml-1 mr-1 " + (exerciseType.category_key ? exerciseType.category_key : "uncategorised");

        return (
            <button key={exerciseType.id} className={buttonClass} onClick={() => this.props.onAdd(exerciseType.id)}>
                <i className="fa fa-calendar-plus-o"></i> {exerciseType.exercise_name}
                <br />
                <small>
                    [{exerciseType.measured_by === "reps" && (exerciseType.default_reps + " reps")}{exerciseType.measured_by === "seconds" && (exerciseType.default_seconds + " seconds")}]
                </small>
			</button>
        );
    }

    render() {
        const exerciseTypeIdsToExclude = this.props.exerciseTypeIdsToExclude ? this.props.exerciseTypeIdsToExclude : [];
        const exerciseTypes = this.props.exerciseTypes.filter(({ id }) => !exerciseTypeIdsToExclude.includes(id));
        const exerciseTypeButtons = exerciseTypes.map(this.renderExerciseTypeButton);

        return(
            <>
            <button key="new" className="btn btn-sm ml-1 mr-1 btn-secondary new-exercise-type" onClick={() => this.props.onAdd(null)}>
                <i className="fa fa-calendar-plus-o"></i> New Exercise Type
                <br />
                <small>&nbsp;</small>
			</button>
            {exerciseTypeButtons}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        exerciseTypes: state.exerciseTypes
    };
}

ExerciseTypeButtonSet = connect(mapStateToProps)(ExerciseTypeButtonSet);

export default ExerciseTypeButtonSet;