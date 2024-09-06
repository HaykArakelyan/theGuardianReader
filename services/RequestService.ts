import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AllNewsModel } from "../Models/AllNewsModel"

export class RequestService {
    private static axiosInstance: AxiosInstance = axios.create({
        baseURL: process.env.API_BASE_URL,
        headers: {
            'Content-Type': "application/json",
            'api-key': process.env.API_KEY,
            'format': "json"
        }
    });

    private static config = {
        "show-fields": "bodyText",
        "show-elements": "image",
    }

    public static getAllNews(page: number = 1, pageSize: number = 10): Promise<AxiosResponse<any>> {
        return this.axiosInstance.get<any>('/search', {
            params: {
                "show-fields": "bodyText",
                "show-elements": "image",
                "page": page,
                "page-size": pageSize,
            }
        });
    }

    public static getNewsByQueryString(queryString: string, page: number = 1, pageSize: number = 10): Promise<AxiosResponse<AllNewsModel>> {
        const encodedQueryString = encodeURIComponent(queryString);
        return this.axiosInstance.get<AllNewsModel>(`/search`, {
            params: {
                "q": encodedQueryString,
                "page": page,
                "page-size": pageSize,
                ...this.config
            }
        });
    }
}