import React, { Component } from "react";

class CounterBox extends Component {
    render() {
        var classes = "col m-2 " +  this.props.categoryKey;

        return(
            <div className={classes}>
                <small>{this.props.categoryName}:</small><br />
                <span class="display-4">{this.props.value}</span> {this.props.uom}
            </div>
        );
    }
}

export default CounterBox;