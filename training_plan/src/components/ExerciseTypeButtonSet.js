import React, { Component } from "react";
import { connect } from "react-redux";

class ExerciseTypeButtonSet extends Component {

    renderExerciseTypeButton = (exerciseType) => {
        const buttonClass = "btn btn-sm ml-1 mr-1 " + exerciseType.category_key;

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
        let exerciseTypes = this.props.exerciseTypes;
        let exerciseTypeButtons = exerciseTypes.map(this.renderExerciseTypeButton);
        return(
            <>
            <h3>Add Exercises</h3>
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