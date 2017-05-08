import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITablet } from './tablet';

@Component({
    templateUrl: './app/invTablets/tablet-detail.component.html'
})
export class TabletDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    tablet: ITablet;
    errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.tablet = this.route.snapshot.data['tablet'];
    }
}
