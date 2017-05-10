import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IEmail } from './email';
import { IUnit } from '../invUnits/unit';

@Component({
    templateUrl: './app/invEmails/email-edit-info.component.html'
})
export class EmailEditInfoComponent implements OnInit {
    @ViewChild(NgForm) emailForm: NgForm;

    errorMessage: string;
    email: IEmail;
    units: IUnit[];
    selectedUnit: string;
    campuses: string[];

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        

        this.route.parent.data.subscribe(data => {
            this.email = data['email'];
            //this.email.Unit = this.selectedUnit;
            
            
            this.units = data['units'];

            if (this.emailForm) {
                this.emailForm.reset();
            }

            this.campuses = ["E", "W"];
            console.log(this.campuses);
        });
    }
}
