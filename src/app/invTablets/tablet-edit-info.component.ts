import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ITablet } from './tablet';

@Component({
    templateUrl: './app/invTablets/tablet-edit-info.component.html'
})
export class TabletEditInfoComponent implements OnInit {
    @ViewChild(NgForm) tabletForm: NgForm;

    errorMessage: string;
    tablet: ITablet;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.tablet = data['tablet'];

            if (this.tabletForm) {
                this.tabletForm.reset();
            }
        });
    }
}
