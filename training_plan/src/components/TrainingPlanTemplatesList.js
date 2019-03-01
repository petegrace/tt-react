import React, { Component } from "react";

class TrainingPlanTemplatesList extends Component {
    render() {
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
                    <hr />
                        <div className="alert alert-info">
                            <h6>Test [<a href="#">Add to Training Plan</a>]</h6>
                            <p>Brief description about the template <a href="#" target="_blank">Click to learn more</a></p>
                        </div>
                </div>
            </div>
        );
    }
}

export default TrainingPlanTemplatesList;