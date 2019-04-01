import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

import App from "./components/App";
import plannedActivitiesReducer from "./reducers/plannedActivitiesReducer";
import plannedRacesReducer from "./reducers/plannedRacesReducer";
import plannedExercisesReducer from "./reducers/plannedExercisesReducer";
import completedActivitiesReducer from "./reducers/completedActivitiesReducer";
import completedExercisesReducer from "./reducers/completedExercisesReducer";
import activityTypesReducer from "./reducers/activityTypesReducer";
import exerciseTypesReducer from "./reducers/exerciseTypesReducer";
import exerciseCategoriesReducer from "./reducers/exerciseCategoriesReducer";
import trainingPlanTemplatesReducer from "./reducers/trainingPlanTemplatesReducer";
import userReducer from "./reducers/userReducer";
import "./base.css";

// Might want to refactor this redux stuff into separate files for reducers and configuring store as per tutorial
const rootReducer = combineReducers({
    form: formReducer,
    plannedActivities: plannedActivitiesReducer,
    plannedRaces: plannedRacesReducer,
    plannedExercises: plannedExercisesReducer,
    completedActivities: completedActivitiesReducer,
    completedExercises: completedExercisesReducer,
    activityTypes: activityTypesReducer,
    exerciseTypes: exerciseTypesReducer,
    exerciseCategories: exerciseCategoriesReducer,
    trainingPlanTemplates: trainingPlanTemplatesReducer,
    user: userReducer
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