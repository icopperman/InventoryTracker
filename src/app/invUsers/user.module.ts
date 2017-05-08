import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';
import { UserEditComponent } from './user-edit.component';
import { UserEditInfoComponent } from './user-edit-info.component';
import { UserEditTagsComponent } from './user-edit-tags.component';

import { UserFilterPipe } from './user-filter.pipe';
import { UserService } from './user.service';
import { UserResolver } from './user-resolver.service';
import { UserEditGuard } from './user-guard.service';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserListComponent
      },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: { user: UserResolver }
      },
      {
        path: ':id/edit',
        component: UserEditComponent,
        resolve: { user: UserResolver },
        canDeactivate: [UserEditGuard],
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: UserEditInfoComponent
          },
          {
            path: 'tags',
            component: UserEditTagsComponent
          }
        ]
      }
    ])
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserEditComponent,
    UserEditInfoComponent,
    UserEditTagsComponent,
    UserFilterPipe
  ],
  providers: [
    UserService,
    UserResolver,
    UserEditGuard
  ]
})
export class UserModule { }
