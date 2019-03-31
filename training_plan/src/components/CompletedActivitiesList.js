import React, { Component } from "react";
import { connect } from "react-redux";

import { filterCompletedActivities } from "../helpers/trainingPlan";

class CompletedActivitiesList extends Component {

    renderCompletedActivitySummary = (completedActivity) => {
        const cardClass = "card " + completedActivity.category_key + "_border_only mt-2";
        const cardHeaderClass = "card-header " + completedActivity.category_key;
        const activityUrl = "/activity_analysis/" + completedActivity.id;

        return (
            <div className="activity-summary" key={completedActivity.id}>
                <div className={cardClass}>
                    <div className={cardHeaderClass}>
                        <h6 className="m-0 p-0">
                            <a href={activityUrl}>
                                {completedActivity.name}&nbsp;
                                {completedActivity.is_race && <i className="fa fa-flag-checkered"></i>}
                            </a>
                        </h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-4">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><small>When:</small></td>
                                            <td>{completedActivity.activity_date}</td>
                                        </tr>
                                        <tr>			
                                            <td><small>Distance:</small></td>
                                            <td>{completedActivity.distance_formatted}</td>
                                        </tr>
                                        <tr>			
                                            <td><small>Moving Time:</small></td>
                                            <td>{completedActivity.moving_time}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-4">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><small>Avg. Pace:</small></td>
                                            <td>{completedActivity.average_pace_formatted}</td>
                                        </tr>
                                        <tr>			
                                            <td><small>Avg. Cadence:</small></td>
                                            <td>{completedActivity.average_cadence}</td>
                                        </tr>
                                        <tr>			
                                            <td><small>Median Cadence:</small></td>
                                            <td>{completedActivity.median_cadence}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-4">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><small>Avg. Heart Rate:</small></td>
                                            <td>{completedActivity.average_heartrate}</td>
                                        </tr>
                                        <tr>			
                                            <td><small>Elevation Gain:</small></td>
                                            <td>
                                                {completedActivity.total_elevation_gain_formatted}
                                            </td>
                                        </tr>
                                        <tr>			
                                            <td><small>Avg. Climbing Gradient:</small></td>
                                            <td>
                                                {completedActivity.average_climbing_gradient_formatted}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                {completedActivity.description &&
                                <p><small>Description:</small> {completedActivity.description}</p>}
                                <p className="mb-1">
                                    <a href={activityUrl}>Analyse Activity</a> |&nbsp;
                                    <a href={completedActivity.strava_url}>View on Strava</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const completedActivities = filterCompletedActivities(this.props.completedActivities, this.props.calendarDay);
        let completedActivitySummaries = completedActivities.map(this.renderCompletedActivitySummary);

        return (
                <div>
                    {completedActivities.length > 0 && (
                        <>
                        <h3>Completed Activities</h3>
                        {completedActivitySummaries}
                        </>
                    )}
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        completedActivities: state.completedActivities
    };
}

CompletedActivitiesList = connect(mapStateToProps)(CompletedActivitiesList)

export default CompletedActivitiesList;