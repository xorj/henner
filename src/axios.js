import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7245/",
});

export default axiosInstance;