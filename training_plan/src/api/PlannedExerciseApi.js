import ls from "local-storage";
                
class PlannedExerciseApi {
    constructor() {
        const accessToken = ls.get("accessToken");

        this.authHeader = "Bearer " + accessToken;
        this.endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
    }

    patchPlannedExercise = (id, requestBody) => {
        const options = {
            method: "PATCH",
            headers: {
                "Authorization": this.authHeader,
                "Content-Type": "application/json"
            },
            body: requestBody,
            mode: "cors"
        };
        const endpoint = this.endpointOrigin + "/api/planned_exercise/" + id;

        return fetch(endpoint, options).then(response => {
            if (response.ok) {
                return true;
            }
        }).catch(error => {
            return error;
        });
    }

    deletePlannedExercise = (id, scope) => {
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": this.authHeader
            }
        };
        const endpoint = this.endpointOrigin + "/api/planned_exercise/" + id + "?scope=" + scope;
        
        return fetch(endpoint, options).then(response => {
            if (response.ok) {
                return true;
            } else {
                throw Error(response.statusText);
            }
        }).catch(error => {
            return error;
        });
    }
}

export default PlannedExerciseApi;