import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// import { AuthService } from './auth.service';
import { UserLoginService } from './user-login.service';
import { IUserLogin } from './user';
import * as _ from 'lodash';

@Component({
    templateUrl: './app/user/login.component.html'
})
export class LoginComponent {

    errorMessage: string;
    pageTitle = 'Log In';
    userName = 'irc9012';
    password = 'Word20nyh!';
    // tslint:disable-next-line:no-trailing-whitespace
    

    constructor(
        // private authService: AuthService,
        private userLoginService: UserLoginService,
        private router: Router) { }

    loginComplete(theUser: IUserLogin) {

        console.log('here');

        if ( _.isEmpty(this.userLoginService.redirectUrl) === false ) {

            this.router.navigateByUrl(this.userLoginService.redirectUrl);

        }
        else {

            this.router.navigate(['/units']);
        }
    }

    handleError = (xx: any) => {

        console.log('here');
        this.errorMessage = 'Please enter a user name and password.';

    }

    login(loginForm: NgForm) {

        if (loginForm && loginForm.valid) {

            let userName = loginForm.form.value.userName;
            let password = loginForm.form.value.password;

            this.userLoginService.login(userName, password)
                .subscribe(
                (theuser: IUserLogin) => {
                    
                    console.log('here');

                    if ( _.isEmpty(this.userLoginService.redirectUrl) === false) {

                        this.router.navigateByUrl(this.userLoginService.redirectUrl);

                    }
                    else {

                        this.router.navigate(['/units']);
                    }
                },
                this.handleError
                );

            // .subscribe(this.loginComplete, this.handleError)

        }
        else {

            this.errorMessage = 'Please enter a user name and password.';
        };
    }
}
