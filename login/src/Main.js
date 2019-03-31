import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

class Main extends Component {
    render() {
        console.log(window.location.hostname);
        return (
            <HashRouter>
                <div>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/reset_password" component={ResetPassword} />
                </div>            
            </HashRouter>
        )
    }
}

export default Main;