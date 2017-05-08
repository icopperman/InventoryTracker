import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IUnit } from './unit';

@Component({
    templateUrl: './app/invUnits/unit-edit-info.component.html'
})
export class UnitEditInfoComponent implements OnInit {
    @ViewChild(NgForm) unitForm: NgForm;

    errorMessage: string;
    unit: IUnit;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.unit = data['unit'];

            if (this.unitForm) {
                this.unitForm.reset();
            }
        });
    }
}
