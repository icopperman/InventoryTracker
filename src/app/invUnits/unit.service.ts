import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUnit } from './unit';

@Injectable()
export class UnitService {
    
    private baseUrl = 'http://webdev.nyp.org/InventoryTrackerSvc/units';

    constructor(private http: Http) { }

    getUnits(): Observable<IUnit[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getUnits: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getUnit(id: number): Observable<IUnit> {
        if (id === 0) {
            return Observable.of(this.initializeUnit());
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getUnit: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteUnit(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteUnit: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveUnit(unit: IUnit): Observable<IUnit> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (unit.id === 0) {
            return this.createUnit(unit, options);
        }
        return this.updateUnit(unit, options);
    }

    private createUnit(unit: IUnit, options: RequestOptions): Observable<IUnit> {
        unit.id = undefined;
        return this.http.post(this.baseUrl, unit, options)
            .map(this.extractData)
            .do(data => console.log('createunit: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateUnit(unit: IUnit, options: RequestOptions): Observable<IUnit> {
        const url = `${this.baseUrl}/${unit.id}`;
        return this.http.put(url, unit, options)
            .map(() => unit)
            .do(data => console.log('updateUnit: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        return body.Units || {};
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeUnit(): IUnit {
        // Return an initialized object
        return {
            id: 0,
            category: null,
            tags: [],
            releaseDate: null,
            price: null,
            description: null,
            starRating: null,
            imageUrl: null,
            active: null, 
            campus: null,
            campus1: null,
            idUnit: 0,
            name: null,
            site: null,
            unitName: null,
            unitCode: null,
            createdDate: null

        };
    }
}
