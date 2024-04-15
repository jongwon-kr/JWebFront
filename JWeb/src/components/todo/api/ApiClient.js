import axios from "axios";

export const apiClient = axios.create(
    { baseURL: "http://222.119.233.177:5000" }
)