import ls from "local-storage";
                
class ActivityTypesApi {
    constructor() {
        const accessToken = ls.get("accessToken");

        this.authHeader = "Bearer " + accessToken;
        this.endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
    }
    
    getActivityTypes = () => {
        const options = {
            method: "GET",
            headers: {
                "Authorization": this.authHeader
            }
        };
        const endpoint = this.endpointOrigin + "/api/activity_types";

        return fetch(endpoint, options).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default ActivityTypesApi;