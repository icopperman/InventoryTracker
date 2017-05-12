import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as _ from 'lodash';

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
    ccs: string[];
    origUnits: IUnit[];

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {

        this.route.parent.data.subscribe(data => {
            
            this.email     = data['email'];
            this.origUnits = data['units'];
            this.ccs       = ["East", "West"];
            
            this.origUnits = _.map(this.origUnits, (aunit: IUnit) => {

                aunit.campus = (aunit.campus == "E") ? "East" : "West";
                return aunit;

            })

            let acampus = this.email.Campus;

            if (acampus.length == 1) {

                acampus = (acampus == "E") ? "East" : "West";
            }
            
            this.units = _.filter(this.origUnits, (unit: IUnit) => unit.campus == acampus);

            this.email.Campus = acampus;

            if (this.emailForm) {
                this.emailForm.reset();
            }

        });
    }

    campusChanged(value: any): void {
       
        this.email.Campus = value;
        this.units = _.filter(this.origUnits, (unit: IUnit) => unit.campus == value);

    }

      unitChanged(value: any): void {

        this.email.Unit = value;

    }
}
