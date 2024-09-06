export interface SingleNewsElementAssetModel {
    type: string;
    mimeType: string;
    file: string;
    typeData: {
        altText: string;
        caption: string;
        credit: string;
        photographer: string;
        source: string;
        width: string | number;
        height: string | number;
        secureFile: string
        displayCredit: string | boolean;
        mediaId: string;
        imageType: string;
        suppliersReference: string;
    }
}