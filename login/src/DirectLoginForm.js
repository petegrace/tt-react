import React, { Component } from "react";
import ls from "local-storage";
import { withRouter, NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";

class DirectLoginButton extends Component {
    constructor() {
        super();
        this.state = {
            isAuthenticated: false,
            user: null,
            token: ""
        };
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
                authType: "direct",
                email: values.email,
                password: values.password
            }),
            mode: "cors"
        };
        const loginApiUrl = window.location.origin === "http://localhost:3000" ? "http://localhost:5000/api/login" : (origin + "/api/login");
        fetch(loginApiUrl, options).then(r => {
            if (r.status === 401) {
                this.setState({
                    serverValidationError: "Incorrect user name or password."
                })                
            }           
            else if (r.status === 201) {
                const accessToken = r.headers.get("x-auth-token");
                ls.set("accessToken", accessToken);
                r.json().then(response => {
                    ls.set("userData", response);
                    window.location.href = "/hub";
                });
            }
            else {
                window.location.href = "/error";
            }
        }).catch(error => {
            window.location.href = "/error";
        });

        setSubmitting(false);
        return;
    }

    render() {
        return (
             <Formik initialValues={{
                            email: "",
                            password: ""
                        }} 
                        validate={this.validateForm}
                        onSubmit={this.handleSubmit}
                        render={formProps => {
                            return (
                                <Form>
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="email">Email</label>
                                        <Field component="input" type="text" className="form-control" id="email" name="email"  required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="password">Password</label>
                                        <Field component="input" type="password" className="form-control" id="password" name="password" required />
                                    </div>
                                    {this.state.serverValidationError &&  <div className="form-error mt-2">{this.state.serverValidationError}</div>}
                                    <div>
                                        <button type="submit" disabled={formProps.isSubmitting} className="btn btn-primary">Login</button>
                                    </div>
                                    <div className="mt-2 text-right"><NavLink to="/reset_password">Forgot your password?</NavLink></div>
                                </Form>
                            );
                        }} />
        );
    }
}

export default withRouter(DirectLoginButton);