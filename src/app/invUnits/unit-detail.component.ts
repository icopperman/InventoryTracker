import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUnit } from './unit';

@Component({
    templateUrl: './app/invUnits/unit-detail.component.html'
})
export class UnitDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    unit: IUnit;
    errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.unit = this.route.snapshot.data['unit'];
    }
}
