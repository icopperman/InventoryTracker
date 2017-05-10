import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../messages/message.service';

import { IEmail } from './email';
import { EmailService } from './email.service';
import { IUnit } from '../invUnits/unit';

@Component({
    templateUrl: './app/invEmails/email-edit.component.html',
    styleUrls: ['./app/invEmails/email-edit.component.css']
})
export class EmailEditComponent implements OnInit {
    pageTitle: string = 'Email Edit';
    errorMessage: string;

    private currentEmail: IEmail;
    private originalEmail: IEmail;
    private dataIsValid: { [key: string]: boolean } = {};
    private units: IUnit[];
    
    get isDirty(): boolean {
        return JSON.stringify(this.originalEmail) !== JSON.stringify(this.currentEmail);
    }

    get email(): IEmail {
        return this.currentEmail
    }
    set email(value: IEmail) {
        this.currentEmail = value;
        // Clone the object to retain a copy
        this.originalEmail = Object.assign({}, value);
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private emailService: EmailService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        // Watch for changes to the resolve data
        this.route.data.subscribe(data => {
             this.onEmailRetrieved(data);
        });
    }

    onEmailRetrieved(data: any): void {
        this.email = data['email'];
        this.units = data['units'];
        let eunit = this.email.Unit;
        
        for (let aunit of this.units) {
            
            if ( eunit == aunit.unitName) {

                this.email.selectedUnit = aunit;
                break;
            }
        }
        
        // Adjust the title
        if (this.email.tblIdx === 0) {
            this.pageTitle = 'Add Email';
        } else {
            this.pageTitle = `Edit Email: ${this.email.EmailAddress}`;
        }
    }

    deleteEmail(): void {
        if (this.email.tblIdx === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(`${this.email.EmailAddress} was deleted`);
        } else {
            if (confirm(`Really delete the email: ${this.email.EmailAddress}?`)) {
                this.emailService.deleteEmail(this.email.tblIdx)
                    .subscribe(
                        () => this.onSaveComplete(`${this.email.EmailAddress} was deleted`),
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

    saveEmail(): void {
        if (this.isValid(null)) {
            this.emailService.saveEmail(this.email)
                .subscribe(
                    () => this.onSaveComplete(`${this.email.EmailAddress} was saved`),
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
        this.router.navigate(['/emails']);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentEmail = null;
        this.originalEmail = null;
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'info' tab
        if (this.email.EmailAddress &&
            this.email.EmailAddress.length >= 3 &&
            this.email.Campus &&
            this.email.Unit) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        // if (this.email.category &&
        //     this.email.category.length >= 3) {
        //     this.dataIsValid['tags'] = true;
        // } else {
        //     this.dataIsValid['tags'] = false;
        // }
    }
}
