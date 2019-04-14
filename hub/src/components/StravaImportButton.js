import React, { Component } from "react";
import { connect } from "react-redux";
import { OauthSender } from "react-oauth-flow";

class StravaImportButton extends Component {
    render() {
        const redirectUri = window.location.origin
        const stravaAuthCreds = this.props.user && {
            clientId: this.props.user.strava_client_id,
            clientSecret: this.props.user.strava_client_secret
        };

        return (
            <OauthSender
                authorizeUrl="https://www.strava.com/oauth/authorize"
                clientId={stravaAuthCreds.clientId}
                redirectUri={redirectUri}
                args={{ scope: "profile:read_all,activity:read"}}
                render={({ url }) => <a href={url} role="button" className={this.props.buttonClass}>{this.props.buttonContent}</a>} />
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

StravaImportButton = connect(mapStateToProps)(StravaImportButton);

export default StravaImportButton;