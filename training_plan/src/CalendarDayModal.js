import React from "react";
import dateFns from "date-fns";

import "./CalendarDayModal.css";

const CalendarDayModal = (props) => {
    const dateFormat = "dddd DD MMMM YYYY";
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                     transform: props.show ? "translateY(0vh)" : "translateY(-100vh)",
                     opacity: props.show ? "1" : "0"
                }}>
                <div className="modal-header">
                    <h3>{dateFns.format(props.calendarDay, dateFormat)}</h3>
                    <span className="clos-modal-btn" onClick={props.close}>x</span>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>Cancel</button>
                    <button className="btn-continue">Save</button>
                </div>
            </div>
        </div>
    );
} 

export default CalendarDayModal;