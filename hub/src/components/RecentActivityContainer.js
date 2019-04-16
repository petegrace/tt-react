import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { format } from "date-fns";

import * as combinedRecentActivityActions from "../actions/combinedRecentActivityActions";

class RecentActivityContainer extends Component {
    constructor(props) {
        super(props);

        // Todo: this should be a user preference and use redux, we'd also need to set it in the Todo Container
        this.state = {
            pageSize: 5
        }
    }

    componentDidMount() {
        this.props.combinedRecentActivityActions.loadCombinedRecentActivities(1, this.state.pageSize);
    }

    handleViewNewerActivity = () => {
        this.props.combinedRecentActivityActions.loadCombinedRecentActivities(this.props.combinedRecentActivities.prevPageNo, this.state.pageSize);
    }

    handleViewOlderActivity = () => {
        this.props.combinedRecentActivityActions.loadCombinedRecentActivities(this.props.combinedRecentActivities.nextPageNo, this.state.pageSize);
    }

    renderRecentActivityRow = (recentActivity) => {
        const activityUrl = "/activity_analysis/" + recentActivity.id;
        const viewOnStravaUrl = "https://www.strava.com/activities/" + recentActivity.external_id;
        const exerciseDatetimeFormatted = format(new Date(recentActivity.activity_datetime), "ddd DD MMM HH:mm:ss");

        const editFormInitData = {
            id: recentActivity.id,
            exercise_name: recentActivity.name,
            exercise_datetime: exerciseDatetimeFormatted,
            measured_by: recentActivity.measured_by,
            reps: recentActivity.reps,
            seconds: recentActivity.seconds
        }

        return (
            <tr key={recentActivity.id}>
                <td>{exerciseDatetimeFormatted}</td>
                <td>
                    {recentActivity.scheduled_exercise_id &&
                    <><i className="fa fa-check-square-o"></i>&nbsp;</>}
                    {recentActivity.is_race &&
                    <><i className="fa fa-flag-checkered"></i>&nbsp;</>}
                    {recentActivity.source === "Strava" &&
                    <a href={activityUrl}>{recentActivity.name}</a>}
                    {!(recentActivity.source === "Strava") &&
                    recentActivity.name}
                </td>
                <td>
                    {recentActivity.measured_by === "reps" &&
                    <>{recentActivity.reps} reps</>}
                    {recentActivity.measured_by === "seconds" &&
                    <>{recentActivity.seconds} secs </>}
                    {recentActivity.measured_by === "distance" &&
                    <>{recentActivity.distance_formatted}</>}
                </td>
                <td>
                    {recentActivity.source === "Exercise" &&
                    <a href="#edit" onClick={() => this.props.onEditCompletedExercise(editFormInitData)}><i className="fa fa-edit"></i> Edit</a>}
                    {recentActivity.source === "Strava" &&
                    <a href={viewOnStravaUrl}>View on Strava</a>}
                </td>
            </tr>
        );
    }

    render() {
        const recentActivities = this.props.combinedRecentActivities.activitiesAndExercises;
        const recentActivityRows = recentActivities.map(this.renderRecentActivityRow);
        const newerNavClass = "page-item" + (this.props.combinedRecentActivities.prevPageNo ? "" : " disabled");
        const olderNavClass = "page-item" + (this.props.combinedRecentActivities.nextPageNo ? "" : " disabled");

        return (
            <>
            {recentActivities.length > 0 &&
            <div className="mt-2">
                <div className="row align-items-end">
                    <div className="col-md">
                        <h4 className="mt-3">Recently added activity</h4>
                        <p>(Go to <a href="/weekly_activity/current">Analysis & Goals</a> to see more activity)</p>
                    </div>
                    <div className="col-md">
                        <nav>
                            <ul className="pagination-sm nav justify-content-end ml-auto mb-2">					
                                <li className={newerNavClass}>
                                    <button className="page-link" onClick={() => this.handleViewNewerActivity()}>Newer</button>
                                </li>
                                <li className={olderNavClass}>
                                <button className="page-link" onClick={() => this.handleViewOlderActivity()}>Older</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table table-sm table-hover">
                            <tbody>                        
                                {recentActivityRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        combinedRecentActivities: state.combinedRecentActivities
    };
}

function mapDispatchToProps(dispatch) {
    return {
        combinedRecentActivityActions: bindActionCreators(combinedRecentActivityActions, dispatch)
    };
}

RecentActivityContainer = connect(mapStateToProps, mapDispatchToProps)(RecentActivityContainer);

export default RecentActivityContainer;