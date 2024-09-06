import type { SingleNewsElementModel } from "./SingleNewsElementModel";

export interface SingleNewsBlockMainModel {
    id: string;
    bodyHtml: string;
    bodyTextSummary: string;
    attributes: {};
    published: boolean;
    createdDate: string;
    lastModifiedDate: string;
    contributors: [];
    elements: SingleNewsElementModel[]
}