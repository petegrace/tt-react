import React, { Component } from "react";

import CountersContainer from "./CountersContainer";

class Main extends Component {
    render() {
        return (
            // This is where we can add routing in due course
            <>
            <h1>Main works!</h1>
            <CountersContainer />
            </>
        )
    }
}

export default Main;