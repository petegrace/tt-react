import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import dateFns from "date-fns";

import { filterPlannedActivities } from "../helpers/trainingPlan";

class PlannedActivitiesList extends Component {

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
                <td className="name-badge"><h5><span className={badgeClass}>{plannedActivity.activity_type}</span></h5></td>
                <td>{plannedActivity.planned_distance ? plannedActivity.planned_distance + " km" : ""}</td>
                <td>{plannedActivity.description}</td>
                <td>
                    {plannedActivity.recurrence === "once" && "Once only"}
                    {plannedActivity.recurrence === "weekly" && <>Repeats every {dateFns.format(this.props.calendarDay, "dddd")}</>}
                </td>
                <td className="actions">
                    <ul className="nav justify-content-end">
                        <li className="nav-item mr-3">
                            <a href="#" role="button" onClick={() => this.props.onEdit(formInitData)}><i className="fa fa-edit"></i></a>
                        </li>
                        <Dropdown as="li" className="nav-item">
                            <Dropdown.Toggle as="a" cole="button" href="#" bsPrefix="none"><i className="fa fa-trash"></i></Dropdown.Toggle>
                            <Dropdown.Menu alignRight="true">
                                {plannedActivity.recurrence === "once" &&
                                <Dropdown.Item href="#" role="button" onClick={() => this.props.onRemove(plannedActivity.id, "all")}>Remove from plan</Dropdown.Item>}
                                {plannedActivity.recurrence === "weekly" &&
                                <>
                                <Dropdown.Item href="#" role="button" onClick={() => this.props.onRemove(plannedActivity.id, dateFns.format(this.props.calendarDay, "YYYY-MM-DD"))}>Remove for this day</Dropdown.Item>
                                <Dropdown.Item href="#" role="button" onClick={() => this.props.onRemove(plannedActivity.id, "all")}>Remove for all weeks</Dropdown.Item>
                                </>}
                            </Dropdown.Menu>
                        </Dropdown>
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

PlannedActivitiesList = connect(mapStateToProps)(PlannedActivitiesList)

export default PlannedActivitiesList;