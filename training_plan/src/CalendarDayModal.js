import React from "react";
import dateFns from "date-fns";

import "./CalendarDayModal.css";
import PlannedActivitiesList from "./PlannedActivitiesList"
//import PlannedActivityForm from "./PlannedActivityForm";

const CalendarDayModal = (props) => {
    const dateFormat = "dddd DD MMMM YYYY";
    const calendarDay = props.calendarDay;

    return (
        <div className="modal-back-drop">
            <div className="modal-wrapper">
                <div className="calendar-modal-header">
                    <h4>{dateFns.format(props.calendarDay, dateFormat)}</h4>
                    <span className="close-modal-btn" onClick={props.close}><i className="fa fa-window-close"></i></span>
                </div>
                <div className="calendar-modal-body">
                        <div>
                            <PlannedActivitiesList calendarDay={calendarDay} />
                            {/* TODO: toggle visibility for <PlannedActivityForm /> */}
                        </div>
                    {props.children}
                </div>
            </div>
        </div>
    );
} 

export default CalendarDayModal;