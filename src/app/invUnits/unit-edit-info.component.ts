import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import * as _ from 'lodash';

import { IUnit } from './unit';

@Component({
    templateUrl: './app/invUnits/unit-edit-info.component.html'
})
export class UnitEditInfoComponent implements OnInit {
    @ViewChild(NgForm) unitForm: NgForm;

    errorMessage: string;
    unit: IUnit;
    ccs: string[];
    types: string[];

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.unit = data['unit'];
            this.ccs       = ["East", "West"];
            this.types  =["Clinical 1", "Clinical 2", "Non-Clinical"];
            let acampus = this.unit.campus;

            if (acampus.length == 1) {

                acampus = (acampus == "E") ? "East" : "West";
            }

            this.unit.campus = acampus;
            
            if (this.unitForm) {
                this.unitForm.reset();
            }
        });
    }

    campusChanged(value: any): void {
   
        this.unit.campus = value;
        //this.units = _.filter(this.origUnits, (unit: IUnit) => unit.campus == value);
    }

    typeChanged(value: any): void {

        this.unit.type = value;
    }
}
