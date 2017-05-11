import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { ITablet } from './tablet';
import { IUnit } from '../invUnits/unit';

import { TabletService } from './tablet.service';

@Component({
    templateUrl: './app/invTablets/tablet-list.component.html',
    styleUrls: ['./app/invTablets/tablet-list.component.css']
})
export class TabletListComponent implements OnInit {
    pageTitle: string = 'Tablet List';
    // imageWidth: number = 50;
    // imageMargin: number = 2;
    // showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    tablets: ITablet[];
    units: IUnit[];

    constructor(private tabletService: TabletService,
        private route: ActivatedRoute) { }

    // toggleImage(): void {
    //     this.showImage = !this.showImage;
    // }

    ngOnInit(): void {
        this.listFilter = this.route.snapshot.queryParams['filterBy'] || '';
        // this.showImage = (this.route.snapshot.queryParams['showImage'] === 'true');
        // console.log(this.route.snapshot.queryParamMap.get('filterBy'));            

        this.tabletService.getTablets()
            .subscribe(tablets => {

                this.tablets = _.map(tablets, (atablet: ITablet) => {
                    atablet.Campus = (atablet.Campus == 'E') ? "East" : "West";
                    return atablet;
                })
            },
            error => this.errorMessage = <any>error);
    }
}
