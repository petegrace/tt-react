import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import ls from "local-storage";

import GoogleLoginButton from "./GoogleLoginButton";
import DirectLoginForm from "./DirectLoginForm";

class Login extends Component {

    componentWillMount() {
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
            const checkTokenApiUrl = window.location.origin === "http://localhost:3000" ? "http://localhost:5000/api/check_token" : (window.location.origin + "/api/check_token");
            fetch(checkTokenApiUrl, options).then(r => {
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
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">Get started<div className="d-none d-md-inline"> now</div>!</h1>
                        <div className="lead mb-4">If you're new to the site you can sign up quickly using your Google account, or directly using your email address.</div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card-body mb-2">
                                    <h5 className="mt-0 mb-3">Login with Google account</h5>
                                    <GoogleLoginButton />
                                    <p className="mt-3 mb-0">We'll register your account if you're new to Training Ticks.</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <h5 className="mt-0">Login with email</h5>
                                    <p>or <NavLink to="/register">register new account</NavLink></p>
                                    <DirectLoginForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="display-4">Learn more...</h1>
                <div className="row featurette mt-0 pt-2 pb-2">
                    <div className="col-md-5">
                    <h2 className="featurette-heading">Create your own customised training plan.</h2>
                    <p className="lead">Improve your training routine by planning your runs, cross-training and strengthening exercises, either as one-off activities or on a recurring weekly basis.</p>
                    <p className="lead">Then every time you log in you’ll be presented with your planned activities and exercises to tick off for the that day.</p>
                    <p className="lead">You can create and plan any type of exercise you like but if you want some help getting started we’ve provided some templates for simple strengthening plans designed specifically for runners.</p>
                    </div>
                    <div className="col-md-4 pt-4">
                    <img className="featurette-image img-fluid mx-auto" src={require("./static/img/training_plan_1.jpg")} alt="Create training plan" />
                    </div>
                    <div className="col-md-3 pt-4">
                    <img className="featurette-image img-fluid mx-auto" src={require("./static/img/training_plan_2.jpg")} alt="Create training plan" />
                    </div>
                </div>

                <div className="row featurette mt-5 pt-2 pb-2 alt-featurette">
                    <div className="col-md-4 order-md-3">
                    <h2 className="featurette-heading">Set and track weekly goals.</h2>
                    <p className="lead">You can set training goals for anything from how many runs you want to complete in a week or what distance you're looking to get up to, through to more complex goals based on cadence or hill training.</p>
                    <p className="lead">Setting goals is easily done from the same interface as you analyse your activity. Your progress is then easily visibly, and you can track multiple goals for the week.</p>
                    </div>
                    <div className="col-md-4 pt-4 order-md-1">
                    <img className="featurette-image img-fluid mx-auto" src={require("./static/img/create-goal.jpg")} alt="Create goal" />
                    </div>
                    <div className="col-md-4 pt-4 order-md-2">
                    <img className="featurette-image img-fluid mx-auto" src={require("./static/img/track_goals.jpg")} alt="Track goals" />
                    </div>
                </div>

                <div className="row featurette mt-5 pt-2 pb-2">
                    <div className="col-md-4">
                    <h2 className="featurette-heading">Analyse your activity for the week.</h2>
                    <p className="lead">Training Ticks imports your Strava data and enriches it within the context of your training.</p>
                    <p className="lead">The Analysis & Goals section lets you see all of your activity for the week in one place under a simple, expandable interface. Charts at the top aggregate your data up to a weekly level and track your goals.</p>
                    </div>
                    <div className="col-md-4 pt-4">
                    <img className="featurette-image img-fluid mx-auto" src={require("./static/img/weekly_analysis.jpg")} alt="Weekly Analysis" />
                    </div>
                    <div className="col-md-4 pt-4">
                    <img className="featurette-image img-fluid mx-auto" src={require("./static/img/one_place.jpg")} alt="Weekly Activity" />
                    </div>
                </div>

                <div className="row featurette mt-5 pt-2 pb-2 alt-featurette">
                    <div className="col-md-7 order-md-2">
                    <h2 className="featurette-heading">Cadence analysis on your Strava activities.</h2>
                    <p className="lead">If your Strava activity includes cadence data then Training Ticks will import it and provide you with insightful visualisations so you can understand your natural cadence and how it changes from activity to activity.  Great for interval training training and working on your leg speed.</p>
                    </div>
                    <div className="col-md-5 pt-4 order-md-1">
                    <img className="featurette-image img-fluid mx-auto" src={require("./static/img/activity_analysis.jpg")} alt="Activity Analysis" />
                    </div>
                </div>

                    <div className="row featurette mt-5 pt-2 pb-2">
                    <div className="col-md-8">
                    <h2 className="featurette-heading">Record strengthening exercises with just one click.</h2>
                    <p className="lead">Training Ticks gives you an easy-to-use tool for tracking your strength and conditioning workouts, or any other kinds of exercises that you like to include in your training.</p>
                    <p className="lead">Once you've logged an exercise type for the first time it becomes available as a new button to record again using default reps or time to hold.</p>
                    <p className="lead">If you've already recorded your activity in Strava then just Connect With Strava to see all of your training in one place.</p>
                    </div>
                    <div className="col-md-4 pt-4">
                    <img className="featurette-image img-fluid mx-auto" src={require("./static/img/one-click.jpg")} alt="One-click activities" />
                    </div>
                </div>

                <div className="row featurette mt-5 pt-2 pb-2 alt-featurette">
                    <div className="col-md-7 order-md-2">
                    <h2 className="featurette-heading">Categorisation and colour-coding.</h2>
                    <p className="lead">Set your own categories for activities and exercises to give yourself a more user-friendly interface through colour-coding of activities, and allow you to segment your activities when analysing.</p>
                    </div>
                    <div className="col-md-5 pt-4 order-md-1">
                    <img className="featurette-image img-fluid mx-auto" src={require("./static/img/categories.jpg")} alt="Categories" />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);