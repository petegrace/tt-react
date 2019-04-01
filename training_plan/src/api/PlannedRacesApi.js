import ls from "local-storage";
                
class PlannedRacesApi {
    constructor() {
        const accessToken = ls.get("accessToken");

        this.authHeader = "Bearer " + accessToken;
        this.endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
    }
    
    postPlannedRaces = (requestBody) => {
        const options = {
            method: "POST",
            headers: {
                "Authorization": this.authHeader,
                "Content-Type": "application/json"
            },
            body: requestBody,
            mode: "cors"
        };
        const endpoint = this.endpointOrigin + "/api/planned_races";

        return fetch(endpoint, options).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).catch(error => {
            return error;
        });
    }
}

export default PlannedRacesApi;