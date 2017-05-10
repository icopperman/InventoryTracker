import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmail } from './email';
import {IUnit} from '../invUnits/unit';

@Component({
    templateUrl: './app/invEmails/email-detail.component.html'
})
export class EmailDetailComponent implements OnInit {
    pageTitle: string = 'Email Detail';
    email: IEmail;
    units: IUnit[];
    errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        
        this.email = this.route.snapshot.data['email'];
   
        //this.units = this.route.snapshot.data['units'];
    }
}
