import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { format } from "date-fns";

import * as combinedRecentActivityActions from "../actions/combinedRecentActivityActions";

class RecentActivityContainer extends Component {

    componentDidMount() {
        this.props.combinedRecentActivityActions.loadCombinedRecentActivities(1, 5);
    }

    renderRecentActivityRow = (recentActivity) => {
        const activityUrl = "{{ url_for('activity_analysis', id=" + recentActivity.id + ") }}";
        const viewOnStravaUrl = "https://www.strava.com/activities/" + recentActivity.external_id;

        return (
            <tr>
                <td>{format(new Date(recentActivity.activity_datetime), "ddd DD MMM HH:mm:ss")}</td>
                <td>
                    {recentActivity.scheduled_exercise_id &&
                    <><i class="fa fa-check-square-o"></i>&nbsp;</>}
                    {recentActivity.is_race &&
                    <><i class="fa fa-flag-checkered"></i>&nbsp;</>}
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
                    <a href="#todo"><i class="fa fa-edit"></i> Edit</a>}
                    {recentActivity.source === "Strava" &&
                    <a href={viewOnStravaUrl}>View on Strava</a>}
                </td>
            </tr>
        );
    }

    render() {
        const recentActivities = this.props.combinedRecentActivities.activitiesAndExercises;
        const recentActivityRows = recentActivities.map(this.renderRecentActivityRow);

        return (
            <>
            {recentActivities.length > 0 &&
            <div className="mt-2">
                <div className="row align-items-end">
                    <div class="col-md">
                        <h4 class="mt-3">Recently added activity</h4>
                        <p>(Go to <a href="{{ url_for('weekly_activity', year='current') }}">Analysis & Goals</a> to see more activity)</p>
                    </div>
                    {/* TODO: come back and do the paging */}
                    {/* <div class="col-md">
                        <nav>
                            <ul class="pagination-sm nav justify-content-end ml-auto mb-2">					
                                <li class="page-item {% if not prev_url %}disabled{% endif %}">
                                    <a class="page-link" href="{{ prev_url }}">Newer</a>
                                </li>
                                <li class="page-item {% if not next_url %}disabled{% endif %}">
                                    <a class="page-link" href="{{ next_url }}">Older</a>
                                </li>
                            </ul>
                        </nav>
                    </div> */}
                </div>
                <div className="row">
                    <div class="col">
                        <table class="table table-sm table-hover">                            
                            {recentActivityRows}
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