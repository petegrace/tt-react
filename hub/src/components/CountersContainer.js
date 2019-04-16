import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as annualStatsActions from "../actions/annualStatsActions";

import CounterBox from "./CounterBox";

class CountersContainer extends Component {

    componentDidMount() {
        this.props.annualStatsActions.loadAnnualStats();
    }

    // function to be called from map() passing in array of counter objects 
    createCounterBoxes = (counter) => {
        return <CounterBox key={counter.category_key} categoryName={counter.category_name} categoryKey={counter.category_key} value={counter.value} uom={counter.uom} />
    }

    render() {
        const counters = this.props.annualStats.counters;
        const counterBoxes = counters.map(this.createCounterBoxes);

        return (
            <>
            {counters.length > 0 && (
            <div>
                <h4 className="mt-3">{this.props.annualStats.heading}</h4>
                <div className="row">
                    {counterBoxes}
                </div>
            </div>
            )}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        annualStats: state.annualStats
    };
}

function mapDispatchToProps(dispatch) {
    return {
        annualStatsActions: bindActionCreators(annualStatsActions, dispatch)
    };
}

CountersContainer = connect(mapStateToProps, mapDispatchToProps)(CountersContainer);

export default CountersContainer;