/* Defines the product entity */
export interface ITablet {
    id: number;
    category: string;
    tags?: string[];
    releaseDate: string;
    price: number;
    description: string;
    starRating: number;
    imageUrl: string;
    tabletCode: string;
    campus1: string;
    name: string;
    site: string;
    
    idTablet: number;
    tabletName: string;
    unitName: string;
    active: string;
    status: string;
    createdDate: string;
    campus: string;

}
