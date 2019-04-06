class TrainingPlanTemplatesApi {
    constructor() {
        this.endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
    }
    
    getTrainingPlanTemplates = () => {
        const options = {
            method: "GET"
        };
        const endpoint = this.endpointOrigin + "/api/training_plan_templates";

        return fetch(endpoint, options).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).catch(error => {
            throw error;
        });
    }
}

export default TrainingPlanTemplatesApi;