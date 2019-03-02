import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as trainingPlanTemplateActions from "../actions/trainingPlanTemplateActions";
import * as activityTypeActions from "../actions/activityTypeActions";

class TrainingPlanTemplatesContainer extends Component {  

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
                    <h6>{template.name} [<a href="#" onClick={() => this.handleAddToTrainingPlan(template.id)}>Add to Training Plan</a>]</h6>
                    <p>{template.description} <a href={template.link_url} target="_blank" rel="noopener noreferrer">{template.link_text}</a></p>
                </div>
            </div>
        );
    }

    render() {
        let templates = this.props.trainingPlanTemplates;
        let templateDetailsList = templates.map(this.renderTemplateDetails);

        return (
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

TrainingPlanTemplatesContainer = connect(mapStateToProps, mapDispatchToProps)(TrainingPlanTemplatesContainer);

export default TrainingPlanTemplatesContainer;