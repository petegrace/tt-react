import React, { Component } from "react";
import CounterBox from "./CounterBox";

var xhr;

class CountersContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "heading": "",
            "counters": []
        };

        this.processResponse = this.processResponse.bind(this);
        this.createCounterBoxes = this.createCounterBoxes.bind(this);
    }

    componentDidMount() {
        var endpoint = "http://localhost:5000/counters"; // TODO: We'll need to make this configurable

        xhr = new XMLHttpRequest();
        xhr.open("GET", endpoint, true);
        xhr.send();
        xhr.addEventListener("readystatechange", this.processResponse, false)
    }

    processResponse() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            this.setState(response);
            console.log(this.state);
        }
    }

    // function to be called from map() passing in array of counter objects 
    createCounterBoxes(counter) {
        return <CounterBox categoryName={counter.category_name} categoryKey={counter.category_key} value={counter.value} uom={counter.uom} />
    }

    render() {
        var counters = this.state.counters;
        var counterBoxes = counters.map(this.createCounterBoxes);

        return (
            <div>
                <h4 class="mt-3">{this.state.heading}</h4>
                <div class="row">
                    {counterBoxes}
                </div>
            </div>
        );
    }
}

export default CountersContainer;

