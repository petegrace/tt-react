import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import dateFns from "date-fns";

import { filterPlannedRaces } from "../helpers/trainingPlan";

class PlannedRacesList extends Component {

    renderPlannedRaceSummary = (plannedRace) => {
        const cardClass = "card " + plannedRace.category_key + "_border_only mt-2";
        const cardHeaderClass = "card-header " + plannedRace.category_key;

        const formInitData = {
            id: plannedRace.id,
            name: plannedRace.name,
            planned_date: dateFns.format(this.props.calendarDay, "YYYY-MM-DD"),
            race_type: plannedRace.race_type,
            distance: plannedRace.distance,
            notes: plannedRace.notes,
            distance_uom_preference: this.props.user.distance_uom_preference
        }

        return (
            <div className="activity-summary" key={plannedRace.id}>
                <div className={cardClass}>
                    <div className={cardHeaderClass}>
                        <h6 className="m-0 p-0">
                            {plannedRace.name}&nbsp;<i className="fa fa-flag-checkered"></i>
                        </h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <p>Race Type: {plannedRace.race_type}</p>
                                <p>Distance: {plannedRace.distance}</p>
                                <ul className="nav">
                                    <li className="nav-item mr-3">
                                        <a href="#edit" role="button" onClick={() => this.props.onEdit(formInitData)}><i className="fa fa-edit"></i> Edit</a>
                                    </li>
                                    <Dropdown as="li" className="nav-item">
                                        <Dropdown.Toggle as="a" cole="button" href="#" bsPrefix="none"><i className="fa fa-trash"></i> Remove</Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#" role="button" onClick={() => this.props.onRemove(plannedRace.id, "all")}>Confirm Remove</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </ul>
                                <p></p>
                            </div>
                            <div className="col-sm-6">
                                <p>
                                    Notes:<br />
                                    {plannedRace.notes}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const plannedRaces = filterPlannedRaces(this.props.plannedRaces, this.props.calendarDay);
        let plannedRaceSummaries = plannedRaces.map(this.renderPlannedRaceSummary);

        return (
                <div>
                    {plannedRaces.length > 0 && (
                        <>
                        <h3>Planned Races</h3>
                        {plannedRaceSummaries}
                        </>
                    )}
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        plannedRaces: state.plannedRaces,
        user: state.user
    };
}

PlannedRacesList = connect(mapStateToProps)(PlannedRacesList)

export default PlannedRacesList;