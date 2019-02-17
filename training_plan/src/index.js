import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./base.css"

// Use a Main class that we can flesh out to include routing as we start to do more of the site's functionality from React
ReactDOM.render(
    <Main />,
    document.getElementById("container")
);