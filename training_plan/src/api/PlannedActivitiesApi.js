import dateFns from "date-fns";
import ls from "local-storage";
                
class PlannedActivitiesApi {
    constructor() {
        const accessToken = ls.get("accessToken");

        this.authHeader = "Bearer " + accessToken;
        this.endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
        this.dateFormat = "YYYY-MM-DD";
    }
    
    getPlannedActivities = (startDate, endDate) => {
        const options = {
            method: "GET",
            headers: {
                "Authorization": this.authHeader
            }
        };
        const endpoint = this.endpointOrigin + "/api/planned_activities?"
                                             + "startDate=" + dateFns.format(startDate, this.dateFormat)
                                             + "&endDate=" + dateFns.format(endDate, this.dateFormat);

        return fetch(endpoint, options).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default PlannedActivitiesApi