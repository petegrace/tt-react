import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            passwordResetSent: false
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
                email: values.email
            }),
            mode: "cors"
        };
        const resetPasswordApiUrl = window.location.origin === "http://localhost:3000" ? "http://localhost:5000/api/reset_password_request" : (origin + "/api/reset_password_request");
        fetch(resetPasswordApiUrl, options).then(r => {
            if (r.status === 401) {
                this.setState({
                    serverValidationError: "Email address not recognised as a Training Ticks user."
                })                
            }           
            else if (r.status === 204) {
                this.setState({
                    passwordResetSent: true
                })
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
            <div className="jumbotron">
                <div className="container">
                    {this.state.passwordResetSent && 
                        <>
                        <h1 className="display-4">Check your email</h1>
                        <div className="lead">We've sent you a temporary link that you can use to reset your password.</div>
                        </>
                    }
                    {!this.state.passwordResetSent &&
                    <>
                        <h1 className="display-4">Reset your password</h1>
                        <Formik initialValues={{
                                        email: ""
                                    }} 
                                    validate={this.validateForm}
                                    onSubmit={this.handleSubmit}
                                    render={formProps => {
                                        return (
                                            <div className="col-6 p-0">
                                            <Form>
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="email">Enter your email address below and we'll send you a link you can use to set a new password for Training Ticks.</label>
                                                    <Field component="input" type="text" className="form-control" id="email" name="email" required />
                                                </div>
                                                {this.state.serverValidationError && <div className="form-error mt-2">{this.state.serverValidationError}</div>}
                                                <div>
                                                    <button type="submit" disabled={formProps.isSubmitting} className="btn btn-primary mr-2">Reset my password</button>
                                                    <NavLink to="/" className="btn btn-secondary">Cancel</NavLink>
                                                </div>
                                            </Form>
                                            </div>
                                        );
                                    }} />
                    </>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(ResetPassword);