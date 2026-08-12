import axios from "axios";

const apiLocal = "https://10.0.2.2:7031/api/";
export const api = axios.create({
    baseURL: apiLocal,
})
