import React, { Component } from "react";
import ls from "local-storage";

import CounterBox from "./CounterBox";

class CountersContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "heading": "",
            "counters": []
        };
        
        this.createCounterBoxes = this.createCounterBoxes.bind(this);
    }

    componentDidMount() {
        const accessToken = ls.get("accessToken");
        const authHeader = "Bearer " + accessToken;

        const options = {
            method: "GET",
            headers: {
                "Authorization": authHeader
            }
        };
        const endpoint = window.location.origin === "http://localhost:3000" ? "http://localhost:5000/api/annual_stats" : (window.location.origin + "/api/annual_stats");
        fetch(endpoint, options).then(r => {
            r.json().then(response => {
                this.setState(response);
            });
        });
    }

    // function to be called from map() passing in array of counter objects 
    createCounterBoxes(counter) {
        return <CounterBox key={counter.category_key} categoryName={counter.category_name} categoryKey={counter.category_key} value={counter.value} uom={counter.uom} />
    }

    render() {
        var counters = this.state.counters;
        var counterBoxes = counters.map(this.createCounterBoxes);

        return (
            <div>
                <h4 className="mt-3">{this.state.heading}</h4>
                <div className="row">
                    {counterBoxes}
                </div>
            </div>
        );
    }
}

export default CountersContainer;