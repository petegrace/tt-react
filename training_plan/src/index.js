import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";

import App from "./components/App";
import "./base.css"

const rootReducer = combineReducers({
    form: formReducer
});

const store = createStore(rootReducer);

// Use a Main class that we can flesh out to include routing as we start to do more of the site's functionality from React
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("container")
);