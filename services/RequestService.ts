import axios,{ AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

class RequestService {
    private static axiosInstance: AxiosInstance = axios.create({
        baseURL: process.env.API_BASE_URL,
        headers: {
            'Content-Type': "application/json",
        }
    });
}