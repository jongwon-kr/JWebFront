import axios from "axios";

const apiClient = axios.create(
    { baseURL: "http://localhost:8080" }
)

export const retrieveHelloWorldBean = () => apiClient.get("/hello-world-bean")

// Response to preflight request doesn't pass access control check =>
export const retrieveHelloWorldPathVariable = (username) => apiClient.get(`/hello-world/path-variable/${username}`, {
    headers: {
        Authorization: "Basic am9uZ3dvbjoxMjM0"
    }
})

export const executeBasicAuthenticationService = (token) => apiClient.get(`/basicauth`, {
    headers: {
        Authorization: token
    }
})