import axios from "axios";

const http = axios.create({
    // baseURL: "http://localhost:3002/api/",
    baseURL: "https://legal-ease-api-server-7596b71dea11.herokuapp.com/api/",
    timeout: 5000,
    headers: {
        "Accept": "application/json",
        "Authorization": `Bearer token here`
    }
})

http.interceptors.response.use((response)=>{
    return response;
}, (error) => {
    if (error.response.status === 401) {
        switch (error.response.status) {
            case 401:
                break;
            case 404:
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
})


export default http;