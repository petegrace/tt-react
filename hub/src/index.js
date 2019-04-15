import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { pendingTasksReducer } from "react-redux-spinner";

import combinedRecentActivitiesReducer from "./reducers/combinedRecentActivitiesReducer"
import completedActivitiesReducer from "./reducers/completedActivitiesReducer";
import plannedActivitiesReducer from "./reducers/plannedActivitiesReducer";
import completedExercisesReducer from "./reducers/completedExercisesReducer";
import plannedExercisesReducer from "./reducers/plannedExercisesReducer";
import userReducer from "./reducers/userReducer";
import exerciseTypesReducer from "./reducers/exerciseTypesReducer";
import exerciseCategoriesReducer from "./reducers/exerciseCategoriesReducer";
import annualStatsReducer from "./reducers/annualStatsReducer";
import alertReducer from "./reducers/alertReducer";
import App from "./components/App";
import "./base.css";

const rootReducer = combineReducers({
    form: formReducer,
    combinedRecentActivities: combinedRecentActivitiesReducer,
    completedActivities: completedActivitiesReducer,
    plannedActivities: plannedActivitiesReducer,
    completedExercises: completedExercisesReducer,
    plannedExercises: plannedExercisesReducer,
    user: userReducer,
    exerciseTypes: exerciseTypesReducer,
    exerciseCategories: exerciseCategoriesReducer,
    annualStats: annualStatsReducer,
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