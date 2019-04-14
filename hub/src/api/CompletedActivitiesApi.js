import * as dateFns from "date-fns";
import ls from "local-storage";
                
class CompletedActivitiesApi {
    constructor() {
        const accessToken = ls.get("accessToken");

        this.authHeader = "Bearer " + accessToken;
        this.endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
        this.dateFormat = "YYYY-MM-DD";
    }
    
    getCompletedActivities = (startDate, endDate) => {
        const options = {
            method: "GET",
            headers: {
                "Authorization": this.authHeader
            }
        };
        const endpoint = this.endpointOrigin + "/api/completed_activities?"
                                             + "startDate=" + dateFns.format(startDate, this.dateFormat)
                                             + "&endDate=" + dateFns.format(endDate, this.dateFormat);

        return fetch(endpoint, options).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).catch(error => {
            throw error;
        });
    }
    
    getRecentActivities = (pageNo, pageSize, combineExercises) => {
        const options = {
            method: "GET",
            headers: {
                "Authorization": this.authHeader
            }
        };
        const endpoint = this.endpointOrigin + "/api/completed_activities?"
                                             + "pageNo=" + pageNo
                                             + "&pageSize=" + pageSize
                                             + "&combineExercises=" + combineExercises;

        return fetch(endpoint, options).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).catch(error => {
            throw error;
        });
    }

    postCompletedActivities = (requestBody) => {        
        const options = {
            method: "POST",
            headers: {
                "Authorization": this.authHeader,
                "Content-Type": "application/json"
            },
            body: requestBody,
            mode: "cors"
        };
        const endpoint = this.endpointOrigin + "/api/completed_activities";

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