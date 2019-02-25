import ls from "local-storage";
                
class PlannedExerciseApi {
    constructor() {
        const accessToken = ls.get("accessToken");

        this.authHeader = "Bearer " + accessToken;
        this.endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
    }

    deletePlannedExercise = (id) => {
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": this.authHeader
            }
        };
        const endpoint = this.endpointOrigin + "/api/planned_exercise/" + id;
        
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