import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUser } from './user';

@Component({
    templateUrl: './app/invUsers/user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    user: IUser;
    errorMessage: string;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.user = this.route.snapshot.data['user'];
    }
}
