import ls from "local-storage";
                
class PlannedRaceApi {
    constructor() {
        const accessToken = ls.get("accessToken");

        this.authHeader = "Bearer " + accessToken;
        this.endpointOrigin = window.location.origin === "http://localhost:3000" ? "http://localhost:5000" : (window.location.origin);
    }

    patchPlannedRace = (id, requestBody) => {
        const options = {
            method: "PATCH",
            headers: {
                "Authorization": this.authHeader,
                "Content-Type": "application/json"
            },
            body: requestBody,
            mode: "cors"
        };
        const endpoint = this.endpointOrigin + "/api/planned_race/" + id;

        return fetch(endpoint, options).then(response => {
            if (response.ok) {
                return true;
            }
        }).catch(error => {
            return error;
        });
    }

    deletePlannedRace = (id) => {
        const options = {
            method: "DELETE",
            headers: {
                "Authorization": this.authHeader
            }
        };
        const endpoint = this.endpointOrigin + "/api/planned_race/" + id;

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

export default PlannedRaceApi;