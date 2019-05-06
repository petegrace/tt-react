import dateFns from "date-fns";
import ls from "local-storage";
                
class CompletedActivitiesApi {
    constructor() {
        const accessToken = ls.get("accessToken");

        this.authHeader = "Bearer " + accessToken;
        this.endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
        this.dateFormat = "YYYY-MM-DD";
    }
    
    getCompletedActivities = (startDate, endDate, resultType="detail") => {
        const options = {
            method: "GET",
            headers: {
                "Authorization": this.authHeader
            }
        };
        const endpoint = this.endpointOrigin + "/api/completed_activities?"
                                             + "startDate=" + dateFns.format(startDate, this.dateFormat)
                                             + "&endDate=" + dateFns.format(endDate, this.dateFormat)
                                             + "&resultType=" + resultType;

        return fetch(endpoint, options).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).catch(error => {
            throw error;
        });
    }
}

export default CompletedActivitiesApi;