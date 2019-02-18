import React from "react";
import dateFns from "date-fns";

import "./CalendarDayModal.css";
import PlannedActivitiesList from "./PlannedActivitiesList"

const CalendarDayModal = (props) => {
    const dateFormat = "dddd DD MMMM YYYY";
    return (
        <div className="modal-back-drop">
            <div className="modal-wrapper">
                <div className="calendar-modal-header">
                    <h4>{dateFns.format(props.calendarDay, dateFormat)}</h4>
                    <span className="close-modal-btn" onClick={props.close}><i class="fa fa-window-close"></i></span>
                </div>
                <div className="calendar-modal-body">
                    <PlannedActivitiesList calendarDay={props.calendarDay} />
                    {props.children}
                </div>
            </div>
        </div>
    );
} 

export default CalendarDayModal;