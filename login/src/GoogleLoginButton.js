import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import ls from "local-storage";
import { withRouter } from "react-router-dom";

import config from "./config.json";

class GoogleLoginButton extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            user: null,
            token: ""
        };
    }

    googleResponse = (response) => {
        const endpoint = window.location.origin === "http://localhost:3000" ? "http://localhost:5000/api/login" : (origin + "/api/login");
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authType: "Google",
                google_access_token: response.accessToken
            }),
            mode: "cors"
        };
        fetch(endpoint, options).then(r => {
            // redirect to register if we get an unauthorized response back
            if (r.status === 401) {
                r.json().then(response => {
                    this.props.history.push({
                        pathname: "/register",
                        state: { googleEmail: response.email }
                    });
                });
                
            }           
            else {
                const accessToken = r.headers.get("x-auth-token");
                ls.set("accessToken", accessToken);
                r.json().then(response => {
                    ls.set("userData", response);
                    window.location.href = "/hub";
                });
            }
        });
    };

    onFailure = (error) => {
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
            fetch(endpoint, options).then(r => {
                // redirect to error page
                window.location.href = "/error";
            });
    }

    logout = () => {
        this.setState({
            isAuthenticated: false,
            user: null,
            token: ""
        })
    };

    componentWillMount() {
        // TODO: Refactor the token check into Login component and bin off the token in local storage if not valid (take the logout logic above also)
        const existingToken = ls.get("accessToken");

        if (existingToken) {
            const authHeader = "Bearer " + existingToken;
           
            const options = {
                method: "GET",
                headers: {
                    "Authorization": authHeader
                }
            };
            // Probably shouldn't be async but not critical
            const endpoint = window.location.origin === "http://localhost:3000" ? "http://localhost:5000/api/check_token" : (window.location.origin + "/api/check_token");
            fetch(endpoint, options).then(r => {
                r.json().then(response => {
                    if (response.result === "valid" && window.location.pathname !== "/hub") {
                        window.location.href = "/hub";
                    }
                });
            });
        }
    }

    render() {
        return (
             <GoogleLogin clientId={config.GOOGLE_CLIENT_ID}
                          buttonText="Login"
                          render={renderProps => (
                             <a onClick={renderProps.onClick} href="#"><img src={require("./static/img/btn_google_signin_dark_normal_web.png")} alt="Sign In with Google" /></a>
                          )}
                          onSuccess={this.googleResponse}
                          onFailure={this.onFailure}
                          uxMode="popup" />
        );
    }
}

export default withRouter(GoogleLoginButton);