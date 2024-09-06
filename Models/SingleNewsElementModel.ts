import type { SingleNewsElementAssetModel } from "./SingleNewsElementAssetModel";

export interface SingleNewsElementModel {
    id: string;
    relation: string;
    type: string;
    assets: SingleNewsElementAssetModel[];
}