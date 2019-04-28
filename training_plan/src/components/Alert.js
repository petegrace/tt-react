import React, { Component } from "react";
import { connect } from "react-redux";

class Alert extends Component {
    render() {
        return (
            <>
            {alert && alert.showAlert && (
            <div className="alert alert-info">
                {alert.message}&nbsp;
                {alert.actionLinkText && (
                <>
                (<a href="#action" onClick={() => this.props.onActionLinkClick(alert.actionFormInitData)}>{alert.actionLinkText}</a>)
                </>)}                
            </div>)}
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