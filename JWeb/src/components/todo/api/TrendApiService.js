import { apiClient } from "./ApiClient";

export const retrieveTodayAllTrendsApi = (date) => apiClient.get(`/get-trends/${date}`)