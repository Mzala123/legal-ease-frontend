import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:5000",
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
            default:
                break;
        }
    }
    return Promise.reject(error);
})


export default http;