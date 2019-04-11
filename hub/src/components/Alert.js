import React, { Component } from "react";
import { connect } from "react-redux";

class Alert extends Component {
    render() {
        return (
            <>
            {this.props.alert && this.props.alert.showAlert &&
            <div className="alert alert-info">{this.props.alert.message}</div>}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert
    };
}

Alert = connect(mapStateToProps)(Alert);

export default Alert;