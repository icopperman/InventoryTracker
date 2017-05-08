import {IUnit} from '../invUnits/unit';
/* Defines the product entity */
export interface IEmail {
    // id: number;
    // category: string;
    // tags?: string[];
    // releaseDate: string;
    // price: number;
    // description: string;
    // starRating: number;
    // imageUrl: string;
    // name: string;
    // site: string;
    
    // active: string;
    // campus1: string;
    
    tblIdx: number;
    Campus: string;
    Unit: string;
    EmailAddress: string;
    Units: string[];
    createdDate?: string;
    selectUnit: IUnit;
}
