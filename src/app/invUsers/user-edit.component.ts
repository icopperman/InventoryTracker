import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../messages/message.service';

import { IUser } from './user';
import { UserService } from './user.service';

@Component({
    templateUrl: './app/invUsers/user-edit.component.html',
    styleUrls: ['./app/invUsers/user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    pageTitle: string = 'User Edit';
    errorMessage: string;

    private currentUser: IUser;
    private originalUser: IUser;
    private dataIsValid: { [key: string]: boolean } = {};

    get isDirty(): boolean {
        return JSON.stringify(this.originalUser) !== JSON.stringify(this.currentUser);
    }

    get user(): IUser {
        return this.currentUser
    }
    set user(value: IUser) {
        this.currentUser = value;
        // Clone the object to retain a copy
        this.originalUser = Object.assign({}, value);
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        // Watch for changes to the resolve data
        this.route.data.subscribe(data => {
             this.onUserRetrieved(data['user']);
        });
    }

    onUserRetrieved(user: IUser): void {
        this.user = user;

        // Adjust the title
        if (this.user.id === 0) {
            this.pageTitle = 'Add User';
        } else {
            this.pageTitle = `Edit User: ${this.user.userName}`;
        }
    }

    deleteUser(): void {
        if (this.user.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(`${this.user.userName} was deleted`);
        } else {
            if (confirm(`Really delete the user: ${this.user.userName}?`)) {
                this.userService.deleteUser(this.user.id)
                    .subscribe(
                        () => this.onSaveComplete(`${this.user.userName} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    isValid(path: string): boolean {
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    saveUser(): void {
        if (this.isValid(null)) {
            this.userService.saveUser(this.user)
                .subscribe(
                    () => this.onSaveComplete(`${this.user.userName} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();
        // Navigate back to the product list
        this.router.navigate(['/users']);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentUser = null;
        this.originalUser = null;
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'info' tab
        if (this.user.userName &&
            this.user.userName.length >= 3 &&
            this.user.userCode) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        if (this.user.category &&
            this.user.category.length >= 3) {
            this.dataIsValid['tags'] = true;
        } else {
            this.dataIsValid['tags'] = false;
        }
    }
}
