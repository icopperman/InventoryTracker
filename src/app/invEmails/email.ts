import {IUnit} from '../invUnits/unit';

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
    selectedUnit: IUnit;
}

export class Email {
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
    selectedUnit: IUnit;
}
