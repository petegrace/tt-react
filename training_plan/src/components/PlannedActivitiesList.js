import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dateFns from "date-fns";

import { filterPlannedActivities } from "../helpers/trainingPlan";
import * as plannedActivityActions from "../actions/plannedActivityActions";

class PlannedActivitiesList extends Component {

    handleRemoveActivity = (plannedActivityId) => {
        this.props.actions.deletePlannedActivity(plannedActivityId);
    }

    renderPlannedActivityRow = (plannedActivity) => {
        const badgeClass = "badge badge-primary " +  plannedActivity.category_key;
        const formInitData = {
            id: plannedActivity.id,
            activity_type: plannedActivity.activity_type,
            category_key: plannedActivity.category_key,
            description: plannedActivity.description,
            planned_distance: plannedActivity.planned_distance,
            recurrence: plannedActivity.recurrence,
            planned_date: dateFns.format(this.props.calendarDay, "YYYY-MM-DD"),
            repeatOption: "Repeat every " + dateFns.format(this.props.calendarDay, "dddd")
        }

        return (
            <tr key={plannedActivity.id}>
                <td><h5><span className={badgeClass}>{plannedActivity.activity_type}</span></h5></td>
                <td>{plannedActivity.planned_distance ? plannedActivity.planned_distance + " km" : ""}</td>
                <td>{plannedActivity.description}</td>
                <td>
                    {plannedActivity.recurrence === "once" && "Once only"}
                    {plannedActivity.recurrence === "weekly" && <>Repeats every {dateFns.format(this.props.calendarDay, "dddd")}</>}
                </td>
                <td>
                    <ul className="nav justify-content-end">
                        <li className="nav-item mr-5">
                            <a href="#" role="button" onClick={() => this.props.onEdit(formInitData)}><i className="fa fa-edit"></i> Edit</a>
                        </li>
                        <li className="nav-item mr-5">
                            <a href="#" role="button" onClick={() => this.handleRemoveActivity(plannedActivity.id)}><i className="fa fa-trash"></i> Remove</a>
                        </li>
                    </ul>
                </td>
            </tr>
        );
    }

    render() {
        const plannedActivities = filterPlannedActivities(this.props.plannedActivities, this.props.calendarDay);
        let plannedActivityRows = plannedActivities.map(this.renderPlannedActivityRow);

        return (
                <div>
                    {plannedActivities.length > 0 && (
                        <>
                        <h3>Planned Activities</h3>
                        <table className="table table-sm table-hover mt-3">
                            <tbody>
                            {plannedActivityRows}
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
        plannedActivities: state.plannedActivities
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(plannedActivityActions, dispatch)
    };
}

PlannedActivitiesList = connect(mapStateToProps, mapDispatchToProps)(PlannedActivitiesList)

export default PlannedActivitiesList;