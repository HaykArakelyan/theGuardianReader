import { SingleNewsModel } from "./SingleNewsModel"

export interface AllNewsModel {
    response: {
        status: string;
        userTier: string;
        total: number;
        startIndex: number;
        pageSize: number;
        currentPage: number;
        pages: number;
        orderBy: string;
        results: SingleNewsModel[];
    }
}