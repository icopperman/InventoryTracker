import {  PipeTransform, Pipe } from '@angular/core';
import { IEmail } from './email';

@Pipe({
    name: 'emailFilter'
})
export class EmailFilterPipe implements PipeTransform {

    transform(value: IEmail[], filterBy: string): IEmail[] {

        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
<<<<<<< HEAD

=======
        
>>>>>>> 4af2d7dda2f6271fe2f89bf1aedbc5ba2b03a886
        return filterBy ? value.filter((email: IEmail) =>
            email.EmailAddress.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
