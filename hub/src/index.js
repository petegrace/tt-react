import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { pendingTasksReducer } from "react-redux-spinner";

import combinedRecentActivitiesReducer from "./reducers/combinedRecentActivitiesReducer"
import completedActivitiesReducer from "./reducers/completedActivitiesReducer";
import plannedActivitiesReducer from "./reducers/plannedActivitiesReducer";
import completedExercisesReducer from "./reducers/completedExercisesReducer";
import plannedExercisesReducer from "./reducers/plannedExercisesReducer";
import userReducer from "./reducers/userReducer";
import alertReducer from "./reducers/alertReducer";
import App from "./components/App";
import "./base.css";

const rootReducer = combineReducers({
    combinedRecentActivities: combinedRecentActivitiesReducer,
    completedActivities: completedActivitiesReducer,
    plannedActivities: plannedActivitiesReducer,
    completedExercises: completedExercisesReducer,
    plannedExercises: plannedExercisesReducer,
    user: userReducer,
    pendingTasks: pendingTasksReducer,
    alert: alertReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

// Use a Main class that we can flesh out to include routing as we start to do more of the site's functionality from React
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("container")
);