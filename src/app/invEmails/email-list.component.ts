import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { IEmail } from './email';
import { IUnit } from '../invUnits/unit';

import { EmailService } from './email.service';

@Component({
    templateUrl: './app/invEmails/email-list.component.html',
    styleUrls: ['./app/invEmails/email-list.component.css']
})
export class EmailListComponent implements OnInit {
    pageTitle: string = 'Email List';
    // imageWidth: number = 50;
    // imageMargin: number = 2;
    // showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    emails: IEmail[];
    units: IUnit[];

    constructor(private emailService: EmailService,
                private route: ActivatedRoute) { }

    // toggleImage(): void {
    //     this.showImage = !this.showImage;
    // }

    ngOnInit(): void {
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        //this.showImage = (this.route.snapshot.queryParams['showImage'] === 'true');
        // console.log(this.route.snapshot.queryParamMap.get('filterBy'));            

        this.emailService.getEmails()
                .subscribe(emails => {
                    
                    this.emails = _.map(emails, (aemail: IEmail) => { 
                        aemail.Campus = (aemail.Campus == 'E') ? "East" : "West";
                        return aemail;
                    })
                 },
                 error => this.errorMessage = <any>error);
                 
    }
}
