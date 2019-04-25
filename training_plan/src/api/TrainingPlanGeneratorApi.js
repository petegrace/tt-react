import ls from "local-storage";
                
class TrainingPlanGeneratorApi {
    constructor() {
        const accessToken = ls.get("accessToken");

        this.authHeader = "Bearer " + accessToken;
        this.endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
    }
    
    getTrainingPlanGenerator = (targetRaceDistance, targetRaceDate) => {
        const options = {
            method: "GET",
            headers: {
                "Authorization": this.authHeader
            }
        };
        const endpoint = this.endpointOrigin + "/api/training_plan_generator" +
                                                            "?targetRaceDistance=" + targetRaceDistance +
                                                            "&targetRaceDate=" + targetRaceDate;

        return fetch(endpoint, options).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).catch(error => {
            throw error;
        });
    }
}

export default TrainingPlanGeneratorApi;