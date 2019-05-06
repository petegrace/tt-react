import React, { Component } from "react";
import { connect } from "react-redux";

import { filterCalendarPeriodSummary } from "../helpers/trainingPlan";

class CalendarPeriodSummary extends Component {

    renderActivitySummaryRows = (activityTypeAggregation) => {
        const buttonClass = "btn btn-sm ml-1 mr-1 " + activityTypeAggregation.category_key;
        const formInitData = {
            activity_type: activityTypeAggregation.activity_type,
            category_key: activityTypeAggregation.category_key,
            calendar_period: this.props.calendarPeriod,
            period_start_date: this.props.periodStartDate,
            target_activities: 0,
            minimum_distance: 0,
            target_total_distance: 0,
            target_total_moving_time: 0,
            target_total_elevation_gain: 0,
            distance_uom_preference: this.props.user.distance_uom_preference,
            elevation_uom_preference: this.props.user.elevation_uom_preference
        }
        const { onSummaryMetricClick } = this.props; 

        return (
            <tr key={activityTypeAggregation.activity_type}>
                <td className="text-right">
                    <button onClick={() => onSummaryMetricClick(formInitData)} className={buttonClass}>
                        {activityTypeAggregation.activities_completed} {activityTypeAggregation.activity_type}(s)
                    </button>
                </td>
                <td className="text-right">
                    <button onClick={() => onSummaryMetricClick(formInitData)} className={buttonClass}>{activityTypeAggregation.longest_distance_formatted}</button>
                </td>
                <td className="text-right">
                    <button onClick={() => onSummaryMetricClick(formInitData)} className={buttonClass}>{activityTypeAggregation.total_distance_formatted}</button>
                </td>
                <td className="text-right">
                    <button onClick={() => onSummaryMetricClick(formInitData)} className={buttonClass}>{activityTypeAggregation.total_moving_time}</button>
                </td>
                <td className="text-right">
                    <button onClick={() => onSummaryMetricClick(formInitData)} className={buttonClass}>{activityTypeAggregation.total_elevation_gain_formatted}</button>
                </td>
            </tr>
        );
    }

    render() {
        const activitySummary = filterCalendarPeriodSummary(this.props.periodActivitySummary, this.props.periodStartDate);
        const activitySummaryRows = activitySummary.map(this.renderActivitySummaryRows);
    
        return (
            <table className="table table-sm table-hover mt-3">
                <tr>
                    <th className="text-right">Activities Completed</th>
                    <th className="text-right">Longest Distance</th>
                    <th className="text-right">Total Distance</th>
                    <th className="text-right">Total Moving Time</th>
                    <th className="text-right">Total Elevation Gain</th>
                </tr>
                <tbody>
                    {activitySummaryRows}
                </tbody>
            </table>
        );
    }
}

// Can make the use of weeklyActivity more generic in due course
function mapStateToProps(state) {
    return {
        periodActivitySummary: state.weeklyActivitySummary,
        user: state.user
    };
}

CalendarPeriodSummary = connect(mapStateToProps)(CalendarPeriodSummary)

export default CalendarPeriodSummary;