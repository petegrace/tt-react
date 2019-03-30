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
                email: this.state.authType === "Google" ? this.state.googleEmail : values.email,
                password: values.password,
                first_name: values.first_name,
                last_name: values.last_name,
                opt_in_to_marketing_emails: values.opt_in_to_marketing_emails
            }),
            mode: "cors"
        };
        const registerApiUrl = window.location.origin === "http://localhost:3000" ? "http://localhost:5000/api/register" : (origin + "/api/register");
        fetch(registerApiUrl, options).then(r => {
            if (r.status === 409) {
                this.setState({
                    serverValidationError: "Email address is already registered. Please log in or reset your password instead."
                })
            }
            else if (r.status !== 201) {
                window.location.href = "/error";
            }
            else {
                const accessToken = r.headers.get("x-auth-token");
                ls.set("accessToken", accessToken);
                r.json().then(response => {
                    ls.set("userData", response);
                    window.location.href = "/hub?is_new_user=True";
                });
            }
        }).catch(error => {
            window.location.href = "/error";
        });;

        setSubmitting(false);
        return;
    }

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({
                authType: "Google",
                googleEmail: this.props.location.state.googleEmail
            });
        }
    }

    componentDidMount() {
        ReactGA.initialize(config.GOOGLE_CLIENT_ID);
        ReactGA.pageview("/#/register");
    }

    validateForm = (values) => {
        let errors = {};

        if (this.state.authType === "direct") {      
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "Invalid email address";
            }
        
            if (values.password2 !== values.password) {
                errors.password2 = "Passwords do not match";
            }
        }
      
        return errors;
      };

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-4">
                        {this.state.authType === "Google" && "Complete your registration"}
                        {this.state.authType === "direct" && "Register for Training Ticks"}
                    </h1>
                    <Formik initialValues={{
                            consent_privacy: false,
                            opt_in_to_marketing_emails: false,
                            email: "",
                            first_name: "",
                            last_name: "",
                            password: "",
                            password2: ""
                        }} 
                        validate={this.validateForm}
                        onSubmit={this.handleSubmit}
                        render={formProps => {
                            return (
                                <>
                                {this.state.authType === "Google" &&
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
                                    <p>Already have an account? <NavLink to="/">Sign in to your account</NavLink> instead.</p>
                                    <div className="col-md-7 pl-0">
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="email">Email</label>
                                            <Field component="input" type="text" className="form-control" id="email" name="email"  required />
                                            {formProps.errors.email && formProps.touched.email && <div className="form-error mt-2">{formProps.errors.email}</div>}
                                            {this.state.serverValidationError &&  <div className="form-error mt-2">{this.state.serverValidationError}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="first_name">First Name</label>
                                            <Field component="input" type="text" className="form-control" id="first_name" name="first_name" required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="last_name">Last Name</label>
                                            <Field component="input" type="text" className="form-control" id="last_name" name="last_name" required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="password">Password</label>
                                            <Field component="input" type="password" className="form-control" id="password" name="password" required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-control-label" htmlFor="password2">Confirm Password</label>
                                            <Field component="input" type="password" className="form-control" id="password2" name="password2" required />
                                            {formProps.errors.password2 && formProps.touched.password2 && <div className="form-error mt-2">{formProps.errors.password2}</div>}
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