import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as trainingPlanTemplateActions from "../actions/trainingPlanTemplateActions";
import * as activityTypeActions from "../actions/activityTypeActions";

class TrainingPlanToolsContainer extends Component {  

    componentDidMount() {
        this.props.trainingPlanTemplateActions.loadTrainingPlanTemplates();
    }

    handleAddToTrainingPlan = (templateId) => {
        this.props.trainingPlanTemplateActions.copyTrainingPlanTemplate(templateId).then(result => {
            this.props.refresh(this.props.calendarDay);
            this.props.activityTypeActions.loadActivityTypes();
        });
    }

    renderTemplateDetails = (template) => {
        return (
            <div key={template.id}>
                <hr />
                <div className="alert alert-info">
                    <h6>{template.name} [<a href="#add" onClick={() => this.handleAddToTrainingPlan(template.id)}>Add to Training Plan</a>]</h6>
                    <p>{template.description} <a href={template.link_url} target="_blank" rel="noopener noreferrer">{template.link_text}</a></p>
                </div>
            </div>
        );
    }

    render() {
        let templates = this.props.trainingPlanTemplates;
        let templateDetailsList = templates.map(this.renderTemplateDetails);

        return (
            <>
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Try out the new Training Plan Generator for runners</h4>
                </div>
                <div className="card-body">
                    <p>You can now generate a customised training plan for your running races. This is a very early release of
                        a tool we'll be refining to suit more athletes and types of events, and it will work best for people training
                        for events of around half marathon distance. Let us know how you get on with it and if there's anything in particular you'd like to see improved
                        via <a href="mailto:feedback@trainingticks.com">feedback@trainingticks.com</a>.</p>
                    <p>Start by adding your planned race to the calendar above if you haven't already, ensuring that you specify the distance of the event. Then you'll be able
                        to <a href="#tpg" onClick={this.props.onGenerateTrainingPlan} className="font-weight-bold">Generate a Training Plan</a> taking
                        you up to the week of the race.</p>
                </div>
            </div>
            <div className="card mt-4">
                <div className="card-header">
                    <h4>Get started using a template</h4>
                </div>
                <div className="card-body">
                    <p>If you're looking for somewhere to start with creating your personalised training plan,
                        try one of these templates to populate some initial exercises, and then adapt as required.
                        Let us know via <a href="mailto:feedback@trainingticks.com">feedback@trainingticks.com</a> if there's
                        a training plan you've come across that you'd like to be available as a template.</p>
                    <p><i>Please note that Training Ticks has no association with any of the websites or authors referenced below.
                    We are sharing them as useful resources that will hopefully help your training.</i></p>
                    {templateDetailsList}
                </div>
            </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        trainingPlanTemplates: state.trainingPlanTemplates
    };
}

function mapDispatchToProps(dispatch) {
    return {
        trainingPlanTemplateActions: bindActionCreators(trainingPlanTemplateActions, dispatch),
        activityTypeActions: bindActionCreators(activityTypeActions, dispatch)
    };
}

TrainingPlanToolsContainer = connect(mapStateToProps, mapDispatchToProps)(TrainingPlanToolsContainer);

export default TrainingPlanToolsContainer;