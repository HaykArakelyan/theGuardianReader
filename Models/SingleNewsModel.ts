import type { SingleNewsElementModel } from "./SingleNewsElementModel";

export interface SingleNewsModel {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string;
    apiUrl: string;
    fields: {
        bodyText: string;
    }
    elements: SingleNewsElementModel[];
    isHosted: boolean;
    pillarId: string;
    pillarName: string;
}