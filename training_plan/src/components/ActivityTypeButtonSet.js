import React, { Component } from "react";
import { connect } from "react-redux";
import dateFns from "date-fns";

class ActivityTypeButtonSet extends Component {
    
    handleAddActivity = (formInitData) => {
        this.props.onAdd(formInitData)
    }

    renderActivityTypeButton = (activityType) => {
        const buttonClass = "btn btn-sm ml-1 mr-1 " + activityType.category_key;
        const formInitData = {
            activity_type: activityType.activity_type,
            category_key: activityType.category_key,
            planned_date: dateFns.format(this.props.calendarDay, "YYYY-MM-DD"),
            recurrence: "Repeats every " + dateFns.format(this.props.calendarDay, "dddd")
        }

        return (
            <button key={activityType.activity_type} className={buttonClass} onClick={() => this.handleAddActivity(formInitData)}>
                <i className="fa fa-calendar-plus-o"></i> {activityType.activity_type}
                <br />
                <small>&nbsp;</small>
			</button>
        );
    }

    render() {
        let activityTypes = this.props.activityTypes;
        let activityTypeButtons = activityTypes.map(this.renderActivityTypeButton);
        return(
            <>
            <h3>Add Activities</h3>
            {activityTypeButtons}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        activityTypes: state.activityTypes
    };
}

ActivityTypeButtonSet = connect(mapStateToProps)(ActivityTypeButtonSet);

export default ActivityTypeButtonSet;