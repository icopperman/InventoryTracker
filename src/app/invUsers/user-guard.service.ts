import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { UserEditComponent } from './user-edit.component';

@Injectable()
export class UserEditGuard implements CanDeactivate<UserEditComponent> {

    canDeactivate(component: UserEditComponent): boolean {
        if (component.isDirty) {
            let userName = component.user.userName || 'New Product';
            return confirm(`Navigate away and lose all changes to ${userName}?`);
        }
        return true;
    }
}
