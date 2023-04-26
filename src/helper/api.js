import axios from "axios";
export default class Api {
    constructor() {
        this.client = null;
        this.api_url = 'https://api.nasa.gov/mars-photos/api/v1';
    }

    init = () => {

        let headers = {
            Accept: "application/json",
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    getRoverList = () => {
        return this.init().get("/rovers/?api_key=DEMO_KEY");
    };
    getRoverDetail = (roverName, date) => {
        return this.init().get(`/rovers/${roverName}/photos?${date ? `earth_date=${date}&` : ''}api_key=DEMO_KEY`);
    };

}