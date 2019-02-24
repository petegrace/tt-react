import React, { Component } from "react";
import dateFns from "date-fns";
import ls from "local-storage";

import CalendarDayModal from "./CalendarDayModal";

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMonth: new Date(),
            today: new Date(),
            selectedDate: null,
            showCalendarDayModal: false,
            planned_activities: []
        };
    }

    refreshPlannedActivities = (currentMonth) => {
        const accessToken = ls.get("accessToken");
        const authHeader = "Bearer " + accessToken;
        const options = {
            method: "GET",
            headers: {
                "Authorization": authHeader
            }
        };
        const endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
        const dateFormat = "YYYY-MM-DD";
        const startDate = dateFns.startOfWeek(dateFns.startOfMonth(currentMonth), {weekStartsOn: 1});
        const endDate = dateFns.endOfWeek(dateFns.endOfMonth(currentMonth), {weekStartsOn: 1});
        const endpoint = endpointOrigin + "/api/planned_activities?"
                                        + "startDate=" + dateFns.format(startDate, dateFormat)
                                        + "&endDate=" + dateFns.format(endDate, dateFormat);
        console.log(endpoint);
        fetch(endpoint, options).then(r => {
            r.json().then(response => {
                this.setState(response);
            });
        });
    }

    componentDidMount() {
        this.refreshPlannedActivities(this.state.currentMonth);
    }

    renderHeader = () => {
        const dateFormat = "MMMM YYYY";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }

    renderDayNames = () => {
        const dateFormat = "dddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth, {weekStartsOn: 1});

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return (
            <div className="days row">
                {days}
            </div>
        );
    }

    renderPlannedActivityBadge = (plannedActivity) => {
        const badgeClass = "m-1 badge badge-primary " +  plannedActivity.category_key;

        return (
            <span key={plannedActivity.id} className={badgeClass}>{plannedActivity.activity_type}</span>
        );
    }

    renderCells = () => {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart, {weekStartsOn: 1});
        const endDate = dateFns.endOfWeek(monthEnd, {weekStartsOn: 1});
        const dateFormat = "D";
        
        let rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                const plannedActivities = this.filterPlannedActivities(day);
                const plannedActivityBadges = plannedActivities.map(this.renderPlannedActivityBadge);
                
                days.push(
                    <div className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                            ? "disabled"
                            : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                        }`} key={day} onClick={() => this.onDateClick(dateFns.parse(cloneDay), plannedActivities)}>
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                        {plannedActivityBadges}
                    </div>
                );

                day = dateFns.addDays(day, 1);
            }

            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }

        return (
            <div className="body">
                {rows}
            </div>
        );
    }

    filterPlannedActivities = (day) => {
        const jsonDate = dateFns.format(day, "YYYY-MM-DD");
        const plannedActivities = this.state.planned_activities.filter(plannedActivity => plannedActivity.planned_date === jsonDate);
        return plannedActivities;
    }

    onDateClick = (day, plannedActivities) => {
        this.setState({
            selectedDate: day,
            showCalendarDayModal: true,
            selectedDatePlannedActivities: plannedActivities
        });
    };

    handleCloseCalendarDayModal = () => {
        this.setState({
            showCalendarDayModal: false
        });
        this.refreshPlannedActivities(this.state.currentMonth);
    }

    nextMonth = () => {
        const newMonth = dateFns.addMonths(this.state.currentMonth, 1);
        this.setState({
            currentMonth: newMonth
        });
        this.refreshPlannedActivities(newMonth);
    };

    prevMonth = () => {
        const newMonth = dateFns.subMonths(this.state.currentMonth, 1);
        this.setState({
            currentMonth: newMonth
        });
        this.refreshPlannedActivities(newMonth);
    };

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDayNames()}
                {this.renderCells()}
                {this.state.showCalendarDayModal && (
                <CalendarDayModal className="modal" calendarDay={this.state.selectedDate} plannedActivities={this.state.selectedDatePlannedActivities}
                    refresh={this.refreshPlannedActivities} filter={this.filterPlannedActivities} close={this.handleCloseCalendarDayModal} />)}
            </div>
        )
        
    }
}

export default Calendar;