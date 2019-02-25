import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

import App from "./components/App";
import plannedActivitiesReducer from "./reducers/plannedActivitiesReducer";
import plannedExercisesReducer from "./reducers/plannedExercisesReducer";
import activityTypesReducer from "./reducers/activityTypesReducer";
import "./base.css"

// Might want to refactor this redux stuff into separate files for reducers and configuring store as per tutorial
const rootReducer = combineReducers({
    form: formReducer,
    plannedActivities: plannedActivitiesReducer,
    plannedExercises: plannedExercisesReducer,
    activityTypes: activityTypesReducer
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