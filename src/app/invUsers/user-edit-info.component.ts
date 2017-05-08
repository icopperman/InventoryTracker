import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IUser } from './user';

@Component({
    templateUrl: './app/invUsers/user-edit-info.component.html'
})
export class UserEditInfoComponent implements OnInit {
    @ViewChild(NgForm) userForm: NgForm;

    errorMessage: string;
    user: IUser;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.user = data['user'];

            if (this.userForm) {
                this.userForm.reset();
            }
        });
    }
}
