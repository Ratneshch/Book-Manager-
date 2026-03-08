import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.PUBLIC_BASE_URL ,
    withCredentials: true,
})