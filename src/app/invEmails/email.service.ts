import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IEmail } from './email';

@Injectable()
export class EmailService {
    
    private baseUrl = 'http://webdev.nyp.org/InventoryTrackerSvc/email';

    constructor(private http: Http) { }

    getEmails(): Observable<IEmail[]> {
        return this.http.get(this.baseUrl)
            .map(this.extractData)
            .do(data => console.log('getEmails: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getEmail(id: number): Observable<IEmail> {
        if (id === 0) {
            return Observable.of(this.initializeEmail());
        };
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log('getEmail: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteEmail(id: number): Observable<Response> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.baseUrl}/${id}`;
        return this.http.delete(url, options)
            .do(data => console.log('deleteEmail: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveEmail(email: IEmail): Observable<IEmail> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if (email.tblIdx === 0) {
            return this.createEmail(email, options);
        }
        return this.updateEmail(email, options);
    }

    private createEmail(email: IEmail, options: RequestOptions): Observable<IEmail> {
        email.tblIdx = undefined;
        return this.http.post(this.baseUrl, email, options)
            .map(this.extractData)
            .do(data => console.log('createemail: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateEmail(email: IEmail, options: RequestOptions): Observable<IEmail> {
        const url = `${this.baseUrl}/${email.tblIdx}`;
        return this.http.put(url, email, options)
            .map(() => email)
            .do(data => console.log('updateEmail: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private extractData(response: Response) {
        let body = response.json();
        let xx = body.EmailAddresses;

        if ( xx.length == 1) {
            return xx[0];
        }
        else {
            return xx || {};
        }
    }

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }

    initializeEmail(): IEmail {
        // Return an initialized object
        return {
            // id: 0,
            // category: null,
            // tags: [],
            // releaseDate: null,
            // price: null,
            // description: null,
            // starRating: null,
            // imageUrl: null,
            // active: null, 
            // Campus: null,
            // campus1: null,
            // idEmail: 0,
            // site: null,
            // emailCode: null,
            
            tblIdx: 0,
            Campus: null,
            Unit: null,
            EmailAddress: null,
            Units: null, 
            selectUnit: null

        };
    }
}
