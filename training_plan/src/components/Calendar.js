import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dateFns from "date-fns";

import CalendarDayModal from "./CalendarDayModal";
import TrainingPlanTemplatesContainer from "./TrainingPlanTemplatesContainer";
import * as plannedActivityActions from "../actions/plannedActivityActions";
import * as completedActivityActions from "../actions/completedActivityActions";
import { filterPlannedActivities, filterPlannedRaces, filterPlannedExercises, filterCompletedActivities, filterCompletedExercises } from "../helpers/trainingPlan";
import RaceDayBackground from '../static/img/race-day-bg.png';

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentMonth: new Date(),
            today: new Date(),
            selectedDate: new Date(),
            selectedWeek: null,
            showCalendarDayModal: false
        };
    }

    refreshPlannedActivities = (currentMonth) => {
        const startDate = dateFns.startOfWeek(dateFns.startOfMonth(currentMonth), {weekStartsOn: 1});
        const endDate = dateFns.endOfWeek(dateFns.endOfMonth(currentMonth), {weekStartsOn: 1});
        this.props.plannedActivityActions.loadPlannedActivities(startDate, endDate);
    }

    refreshCompletedActivities = (currentMonth) => {
        const startDate = dateFns.startOfWeek(dateFns.startOfMonth(currentMonth), {weekStartsOn: 1});
        const endDate = dateFns.endOfWeek(dateFns.endOfMonth(currentMonth), {weekStartsOn: 1});
        this.props.completedActivityActions.loadCompletedActivities(startDate, endDate);
    }

    refreshAllActivities = (currentMonth) => {
        this.refreshPlannedActivities(currentMonth);
        this.refreshCompletedActivities(currentMonth);
    }

    componentDidMount() {
        this.refreshAllActivities(this.state.currentMonth);
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

    renderPlannedRaceBadge = (plannedRace) => {
        const badgeClass = "badge badge-primary " +  plannedRace.category_key;

        return (
            <div key={plannedRace.id} className="d-inline">
                <div className="d-inline">
                    <span className={badgeClass}>{plannedRace.name}</span>
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
                <div className="d-inline d-md-none">
                    <span className={badgeClass}>{plannedExerciseCategory.category_name[0]}</span>
                </div>
            </div>
        );
    }

    renderCompletedActivityBadge = (completedActivity) => {
        const badgeClass = "badge badge-primary " +  completedActivity.category_key;

        return (
            <div key={completedActivity.id} className="d-inline">
                <div className="d-inline">
                    <span className={badgeClass}><div className="d-none d-md-inline"><i className="fa fa-check"></i></div> {completedActivity.name}</span>
                </div>
            </div>
        );
    }

    renderCompletedExerciseCategoryBadge = (completedExerciseCategory) => {
        const badgeClass = "badge badge-primary " +  completedExerciseCategory.category_key;

        return (
            <div key={completedExerciseCategory.category_key + completedExerciseCategory.exercise_date} className="d-inline">
                <div className="d-inline">
                    <span className={badgeClass}><div className="d-none d-md-inline"><i className="fa fa-check"></i></div> {completedExerciseCategory.category_name}</span>
                </div>
            </div>
        );
    }

    renderCells = () => {
        const { currentMonth, selectedDate, selectedWeek, today } = this.state;
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
            const weekCommencingDay = day;

            for (let i = 0; i < 7; i++) {

                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;

                const plannedActivities = filterPlannedActivities(this.props.plannedActivities, day, "day");
                const plannedActivityBadges = plannedActivities.map(this.renderPlannedActivityBadge);

                const plannedRaces = filterPlannedRaces(this.props.plannedRaces, day);
                const plannedRaceBadges = plannedRaces.map(this.renderPlannedRaceBadge);

                const plannedExerciseCategories = filterPlannedExercises(this.props.plannedExercises, day, "day");
                const plannedExerciseCategoryBadges = plannedExerciseCategories.map(this.renderPlannedExerciseCategoryBadge);

                const completedActivities = filterCompletedActivities(this.props.completedActivities, day);
                const completedActivityBadges = completedActivities.map(this.renderCompletedActivityBadge);

                let backgroundStyle = {}
                let isRaceDay = false;
                if (plannedRaces.length > 0) {
                    isRaceDay = true;
                } else {
                    for (let activity of completedActivities) {
                        if (activity.is_race === true) {
                            isRaceDay = true;
                        }
                    }
                }

                if (isRaceDay) {
                    backgroundStyle = {
                        backgroundImage: `url(${RaceDayBackground})`,
                        backgroundSize: "cover"
                    };
                }

                const completedExercises = filterCompletedExercises(this.props.completedExercises, day);
                const completedExerciseCategoryBadges = completedExercises.map(this.renderCompletedExerciseCategoryBadge);
                
                days.push(
                    <div className={`col cell
                            ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : ""}
                            ${dateFns.isSameDay(day, selectedDate) ? "selected" : ""}
                            ${dateFns.isBefore(day, today) ? "past" : ""}
                        `} style={backgroundStyle} key={day} onClick={() => this.onDateClick(dateFns.parse(cloneDay), plannedActivities)}>
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                        <div className="cell-content">
                            <div>{completedActivityBadges}</div>
                            <div>{completedExerciseCategoryBadges}</div>
                            <div>{plannedActivityBadges}</div>
                            <div>{plannedRaceBadges}</div>
                            <div>{plannedExerciseCategoryBadges}</div>
                        </div>
                    </div>
                );

                day = dateFns.addDays(day, 1);
            }

            // Add rows for flexible planning of future weeks if the user has it enabled
            if (this.props.user && this.props.user.has_flexible_planning_enabled && dateFns.isAfter(day, today)) {
                const plannedWeekActivities = filterPlannedActivities(this.props.plannedActivities, weekCommencingDay, "week");
                const plannedWeekActivityBadges = plannedWeekActivities.map(this.renderPlannedActivityBadge);

                const plannedWeekExerciseCategories = filterPlannedExercises(this.props.plannedExercises, weekCommencingDay, "week");
                const plannedWeekExerciseCategoryBadges = plannedWeekExerciseCategories.map(this.renderPlannedExerciseCategoryBadge);

                rows.push(
                    <div key={"wc-" + weekCommencingDay} className="row">
                        <div className="week-todos">
                            <div className={`col cell
                            ${dateFns.isSameDay(weekCommencingDay, selectedWeek) ? "selected" : ""}`} onClick={() => this.onWeekClick(dateFns.parse(weekCommencingDay))}>
                                <div className="cell-content">
                                    {"Week of " + dateFns.format(weekCommencingDay, "D MMMM")} (to do any day):&nbsp;
                                    {plannedWeekActivityBadges}
                                    {plannedWeekExerciseCategoryBadges}
                                </div>
                            </div>
                        </div>
                    </div>
                );
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
            selectedWeek: null,
            showCalendarDayModal: true,
            showCalendarWeekModal: false,
            selectedDatePlannedActivities: plannedActivities
        });
        document.body.classList.toggle("noscroll");
    };

    onWeekClick = (weekStartDate) => {
        this.setState({
            selectedDate: null,
            selectedWeek: weekStartDate,
            showCalendarDayModal: false,
            showCalendarWeekModal: true
        });
        document.body.classList.toggle("noscroll");
    };

    handleCloseCalendarDayModal = () => {
        this.setState({
            showCalendarDayModal: false,
            showCalendarWeekModal: false
        });
        document.body.classList.toggle("noscroll");
        this.refreshPlannedActivities(this.state.currentMonth);
    }

    nextMonth = () => {
        const newMonth = dateFns.addMonths(this.state.currentMonth, 1);
        this.setState({
            currentMonth: newMonth
        });
        this.refreshAllActivities(newMonth);
    };

    prevMonth = () => {
        const newMonth = dateFns.subMonths(this.state.currentMonth, 1);
        this.setState({
            currentMonth: newMonth
        });
        this.refreshAllActivities(newMonth);
    };

    render() {
        return (
            <>
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDayNames()}
                {this.renderCells()}
            </div>
            {this.state.showCalendarDayModal && (
            <CalendarDayModal className="modal" selectionType="day" calendarDay={this.state.selectedDate} refresh={this.refreshPlannedActivities} close={this.handleCloseCalendarDayModal} />)}
            {this.state.showCalendarWeekModal && (
            <CalendarDayModal className="modal" selectionType="week" calendarDay={this.state.selectedWeek} refresh={this.refreshPlannedActivities} close={this.handleCloseCalendarDayModal} />)}
            <TrainingPlanTemplatesContainer calendarDay={this.state.selectedDate} refresh={this.refreshPlannedActivities} />
            </>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        plannedActivities: state.plannedActivities,
        plannedRaces: state.plannedRaces,
        plannedExercises: state.plannedExercises,
        completedActivities: state.completedActivities,
        completedExercises: state.completedExercises
    };
}

function mapDispatchToProps(dispatch) {
    return {
        plannedActivityActions: bindActionCreators(plannedActivityActions, dispatch),
        completedActivityActions: bindActionCreators(completedActivityActions, dispatch)
    };
}

Calendar = connect(mapStateToProps, mapDispatchToProps)(Calendar)

export default Calendar;