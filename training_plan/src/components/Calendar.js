import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dateFns from "date-fns";

import CalendarDayModal from "./CalendarDayModal";
import * as plannedActivityActions from "../actions/plannedActivityActions";
import { filterPlannedActivities, filterPlannedExercises } from "../helpers/trainingPlan";

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMonth: new Date(),
            today: new Date(),
            selectedDate: null,
            showCalendarDayModal: false
        };
    }

    refreshPlannedActivities = (currentMonth) => {
        const startDate = dateFns.startOfWeek(dateFns.startOfMonth(currentMonth), {weekStartsOn: 1});
        const endDate = dateFns.endOfWeek(dateFns.endOfMonth(currentMonth), {weekStartsOn: 1});
        this.props.actions.loadPlannedActivities(startDate, endDate);
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
        const dateFormatFull = "dddd";
        const dateFormatAbbrev = "ddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth, {weekStartsOn: 1});

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    <div className="d-none d-md-block">
                        {dateFns.format(dateFns.addDays(startDate, i), dateFormatFull)}
                    </div>
                    <div className="d-block d-md-none">
                        {dateFns.format(dateFns.addDays(startDate, i), dateFormatAbbrev)}
                    </div>
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
        const badgeClass = "badge badge-primary " +  plannedActivity.category_key;

        return (
            <div key={plannedActivity.id} className="d-inline">
                <div className="d-none d-md-inline">
                    <span className={badgeClass}>{plannedActivity.activity_type}</span>
                </div>
                <div className="d-inline d-md-none ">
                    <span className={badgeClass}>{plannedActivity.activity_type[0]}</span>
                </div>
            </div>
        );
    }

    renderPlannedExerciseCategoryBadge = (plannedExerciseCategory) => {
        const badgeClass = "badge badge-primary " +  plannedExerciseCategory.category_key;

        return (
            <div key={plannedExerciseCategory.category_key + plannedExerciseCategory.planned_date} className="d-inline">
                <div className="d-none d-md-inline">
                    <span className={badgeClass}>{plannedExerciseCategory.category_name}</span>
                </div>
                <div className="d-inline d-md-none ">
                    <span className={badgeClass}>{plannedExerciseCategory.category_name[0]}</span>
                </div>
            </div>
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

                const plannedActivities = filterPlannedActivities(this.props.plannedActivities, day);
                const plannedActivityBadges = plannedActivities.map(this.renderPlannedActivityBadge);

                const plannedExerciseCategories = filterPlannedExercises(this.props.plannedExercises, day);
                const plannedExerciseCategoryBadges = plannedExerciseCategories.map(this.renderPlannedExerciseCategoryBadge);
                
                days.push(
                    <div className={`col cell
                            ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : ""}
                            ${dateFns.isSameDay(day, selectedDate) ? "selected" : ""}
                        `} key={day} onClick={() => this.onDateClick(dateFns.parse(cloneDay), plannedActivities)}>
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                        <div className="cell-content">
                            <div>{plannedActivityBadges}</div>
                            <div>{plannedExerciseCategoryBadges}</div>
                        </div>
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

    onDateClick = (day, plannedActivities) => {
        this.setState({
            selectedDate: day,
            showCalendarDayModal: true,
            selectedDatePlannedActivities: plannedActivities
        });
        document.body.classList.toggle("noscroll");
    };

    handleCloseCalendarDayModal = () => {
        this.setState({
            showCalendarDayModal: false
        });
        document.body.classList.toggle("noscroll");
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
                <CalendarDayModal className="modal" calendarDay={this.state.selectedDate} refresh={this.refreshPlannedActivities} close={this.handleCloseCalendarDayModal} />)}
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        plannedActivities: state.plannedActivities,
        plannedExercises: state.plannedExercises
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(plannedActivityActions, dispatch)
    };
}

Calendar = connect(mapStateToProps, mapDispatchToProps)(Calendar)

export default Calendar;