import axios from "axios";

const apiBaseUrl = "http://localhost:5000";
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

export { axiosInstance };
