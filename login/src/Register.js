import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import ls from "local-storage";
import ReactGA from "react-ga";

import config from "./config.json";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            googleEmail: "Unknown"
        }
    }

    handleSubmit = (values, {
            props = this.props,
            setSubmitting
        }) => {
        console.log("Values from formik are " + this.state.googleEmail + ", " + values.consent_privacy + " and " + values.opt_in_to_marketing_emails);

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                email: this.state.googleEmail,
                opt_in_to_marketing_emails: values.opt_in_to_marketing_emails
            }),
            mode: "cors"
        };
        console.log(options.body);
        const endpoint = window.location.origin === "http://localhost:3000" ? "http://localhost:5000/api/register" : (origin + "/api/register");
        fetch(endpoint, options).then(r => {
            if (r.status !== 201) {
                console.log(r);
            }
            else {
                const accessToken = r.headers.get("x-auth-token");
                ls.set("accessToken", accessToken);
                r.json().then(response => {
                    ls.set("userData", response);
                    window.location.href = "/hub?is_new_user=True";
                });
            }
        });
        console.log("Registering");

        setSubmitting(false);
        return;
    }

    componentWillMount() {
        if (!this.props.location.state) {
            this.props.history.push("/");
        }
        else {
            this.setState({
                googleEmail: this.props.location.state.googleEmail
            });
        }
    }

    componentDidMount() {
        ReactGA.initialize(config.GOOGLE_CLIENT_ID);
        ReactGA.pageview("/#/register");
    }

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-4">Complete your registration</h1>
                    <Formik initialValues={{
                            consent_privacy: false,
                            opt_in_to_marketing_emails: false
                        }} 
                        onSubmit={this.handleSubmit}
                        render={formProps => {
                            return (
                                <Form>
                                    <p>Welcome <strong>{this.state.googleEmail}</strong>! As this is your first time signing in we need to check you're happy with us storing and processing the data that you provide to us. To complete your registration and get started with Training Ticks, please confirm that you consent to us using this data in accordance with our <a href="{{ url_for('privacy_policy') }}">Privacy Policy</a>.</p>					
                                    <div className="form-group row">
                                        <div className="col-sm-1 pt-1 text-md-right">
                                            <Field type="checkbox" id="consent_privacy" name="consent_privacy" checked={formProps.values.consent_privacy} required />
                                        </div>
                                        <div className="col-sm-11"><label htmlFor="consent_privacy">I consent for Training Ticks to store and process my data as per the Privacy Policy.</label></div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-1 pt-1 text-md-right">
                                            <Field type="checkbox" id="opt_in_to_marketing_emails" name="opt_in_to_marketing_emails" checked={formProps.values.opt_in_to_marketing_emails} />
                                        </div>
                                        <div className="col-sm-11"><label htmlFor="opt_in_to_marketing_emails">(Optional) I'd like to receive occasional updates from Training Ticks to tell me about new features being released or in development and that might help me out with my training.</label></div>
                                    </div>
                                    <p>
                                        <button type="submit" disabled={formProps.isSubmitting} className="btn btn-primary mr-2">Complete Registration</button>
                                        <NavLink to="/" className="btn btn-secondary">Cancel</NavLink>
                                    </p>
                                </Form>
                            )
                        }} />
                </div>
            </div>
        );
    }
}

export default withRouter(Register);