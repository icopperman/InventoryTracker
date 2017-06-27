import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormArray, FormArrayName, FormBuilder, FormControl, FormControlName
            , FormGroup, FormGroupName, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import * as _ from 'lodash';

import { IEmail, Email } from './email';
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
    
    emailFormGroup: FormGroup;
    emailClass: Email = new Email();


    constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

    emailChanges(c: AbstractControl) : void {

        if ( (c.touched || c.dirty ) && c.errors) {
            console.log('here');
        }
    }

    campusChanges(c: AbstractControl) : void {
        
        this.campusChanged(c.value)

        if ( (c.touched || c.dirty ) && c.errors) {
            console.log('here');
        }
    }

    unitsChanges(c: AbstractControl) : void {
        
        if ( (c.touched || c.dirty ) && c.errors) {
            console.log('here');
        }
    }

    ngOnInit(): void {
        
        this.emailFormGroup = this.fb.group({
            emailName: ['', [Validators.required, Validators.email]],
            emailCampus: ['', [Validators.required]],
            unitsSelector: ['', [Validators.required]]
        })
          
        let fldEmail  = this.emailFormGroup.get('emailName');
        let fldCampus = this.emailFormGroup.get('emailCampus');
        let fldUnits  = this.emailFormGroup.get('unitsSelector');
        
        fldEmail.valueChanges.subscribe(val=>this.emailChanges(fldEmail));
        fldCampus.valueChanges.subscribe(val=>this.campusChanges(fldEmail));
        fldUnits.valueChanges.subscribe(val=>this.unitsChanges(fldEmail));
        

        this.route.parent.data.subscribe(data => {


            this.email     = data['email'];
            this.origUnits = data['units'];
            this.ccs       = ["East", "West"];
            
            // this.origUnits = _.map(this.origUnits, (aunit: IUnit) => {

            //     aunit.campus = (aunit.campus == "E") ? "East" : "West";
            //     return aunit;

            // })

            let acampus = this.email.Campus;

            if (acampus.length == 1) {

                acampus = (acampus == "E") ? "East" : "West";
            }
            
            this.units = _.filter(this.origUnits, (unit: IUnit) => unit.campus == acampus);

            this.email.Campus = acampus;
            this.emailFormGroup.setValue({
                emailName: this.email.EmailAddress,
                emailCampus: this.email.Campus,
                unitsSelector: this.units
            });

            //if (this.emailForm) {
            //    this.emailForm.reset();
            //}

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
