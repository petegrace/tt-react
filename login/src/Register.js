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
            authType: "direct",
            googleEmail: "Unknown"
        }
    }

    handleSubmit = (values, {
            props = this.props,
            setSubmitting
        }) => {
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                authType: this.state.authType,
                email: this.state.authType === "google" ? this.state.googleEmail : values.email,
                password: "TODO to ensure it's properly encrypted",
                first_name: values.first_name,
                opt_in_to_marketing_emails: values.opt_in_to_marketing_emails
            }),
            mode: "cors"
        };
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
        if (this.props.location.state) {
            this.setState({
                authType: "google",
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
                    <h1 className="display-4">
                        {this.state.authType === "google" && "Complete your registration"}
                        {this.state.authType === "direct" && "Register for Training Ticks"}
                    </h1>
                    <Formik initialValues={{
                            consent_privacy: false,
                            opt_in_to_marketing_emails: false
                        }} 
                        onSubmit={this.handleSubmit}
                        render={formProps => {
                            return (
                                <>
                                {this.state.authType === "google" &&
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
                                </Form>}
                                {this.state.authType === "direct" &&
                                <Form>
                                    <p>We just need some quick details to sign you up so you can start using Training Ticks. Once you're registered you'll be able to log in using the email and password that you enter below.</p>
                                    <p>Already have an account? <NavLink to="/">Sign in to your account</NavLink> instead.</p>
                                    <div className="col-md-7 pl-0">
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="email">Email</label>
                                            <Field component="input" type="text" className="form-control" id="email" name="email" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="firstName">First Name</label>
                                            <Field component="input" type="text" className="form-control" id="first_name" name="first_name" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="password">Password</label>
                                            <Field component="input" type="password" className="form-control" id="password" name="password" />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="password2">Confirm Password</label>
                                            <Field component="input" type="password" className="form-control" id="password2" name="password2" />
                                        </div>
                                    </div>
                                    <p>To complete your registration, we need to check you're happy with us storing and processing the data that you provide to us. To complete your registration and get started with Training Ticks, please confirm that you consent to us using this data in accordance with our <a href="{{ url_for('privacy_policy') }}">Privacy Policy</a>.</p>
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
                                        <button type="submit" disabled={formProps.isSubmitting} className="btn btn-primary mr-2">Register</button>
                                        <NavLink to="/" className="btn btn-secondary">Cancel</NavLink>
                                    </p>
                                </Form>}
                                </>
                            )
                        }} />
                </div>
            </div>
        );
    }
}

export default withRouter(Register);