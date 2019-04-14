import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { OauthReceiver } from "react-oauth-flow";
import ls from "local-storage";
import { startOfWeek } from "date-fns";

import * as userActions from "../actions/userActions";
import * as completedActivityActions from "../actions/completedActivityActions";
import * as plannedActivityActions from "../actions/plannedActivityActions";
import * as combinedRecentActivityActions from "../actions/combinedRecentActivityActions";
import StravaImportButton from "./StravaImportButton";

class StravaImportContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            today: new Date(),
            weekStartDate: startOfWeek(new Date(), {weekStartsOn: 1})
        }
    }

    handleAuthorizationSuccess = async (accessToken, { response, state }) => {
        this.props.userActions.updateUserStravaAccessToken(accessToken);
        // hedging bets at the moment, might be better to have it in localstorage
        ls.set("stravaAccessToken", accessToken);
        
        // Call the Training Ticks API for importing activities
        const requestBody = JSON.stringify({ 
            strava_access_token: accessToken
        });
        
        this.props.completedActivityActions.addCompletedActivities(requestBody).then(result => {
            this.props.plannedActivityActions.loadPlannedActivities(this.state.weekStartDate, this.state.today);
            this.props.combinedRecentActivityActions.loadCombinedRecentActivities(1, 5);
        });
    }

    handleAuthorizationError = (error) => {
        // use the monitoring API to log the error
        const endpoint = window.location.origin === "http://localhost:3000" ? "http://localhost:5000/api/monitoring" : (origin + "/api/monitoring");
        const requestBody = JSON.stringify({ 
            type: "error",
            message: error.message
        });
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: requestBody,
            mode: "cors"
        };
        fetch(endpoint, options);
        console.log(error.message);
    }
    
    render() {
        const redirectUri = window.location.origin + "/hub";
        const stravaAuthCreds = this.props.user && {
            clientId: this.props.user.strava_client_id,
            clientSecret: this.props.user.strava_client_secret
        };
        const urlParams = new URLSearchParams(window.location.search);
        
        return (
            <>
            {stravaAuthCreds && (
            <div className="card mt-3">
                <div className="card-header">
                    <h4>Import new activities from Strava</h4>
                </div>
                <div className="card-body exercise-buttons">
                    <StravaImportButton buttonContent={(<img src={require("../static/img/btn_strava_connectwith_orange.png")} alt="Connect With Strava" />)} />
                    {(urlParams.has("code") || urlParams.has("error")) && (
                    <OauthReceiver
                        tokenUrl="https://www.strava.com/oauth/token"
                        clientId={stravaAuthCreds.clientId}
                        clientSecret={stravaAuthCreds.clientSecret}
                        redirectUri={redirectUri}
                        onAuthSuccess={this.handleAuthorizationSuccess}
                        onAuthError={this.handleAuthorizationError} />
                    )}
                </div>
            </div>)}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
        completedActivityActions: bindActionCreators(completedActivityActions, dispatch),
        plannedActivityActions: bindActionCreators(plannedActivityActions, dispatch),
        combinedRecentActivityActions: bindActionCreators(combinedRecentActivityActions, dispatch)
    };
}

StravaImportContainer = connect(mapStateToProps, mapDispatchToProps)(StravaImportContainer);

export default StravaImportContainer;