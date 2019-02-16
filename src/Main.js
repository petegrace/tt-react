import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

class Main extends Component {
    render() {
        console.log(window.location.hostname);
        return (
            <HashRouter>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                </div>            
            </HashRouter>
        )
    }
}

export default Main;