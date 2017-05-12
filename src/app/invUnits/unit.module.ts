import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UnitListComponent } from './unit-list.component';
import { UnitDetailComponent } from './unit-detail.component';
import { UnitEditComponent } from './unit-edit.component';
import { UnitEditInfoComponent } from './unit-edit-info.component';
import { UnitEditTagsComponent } from './unit-edit-tags.component';

import { UnitFilterPipe } from './unit-filter.pipe';
import { UnitService } from './unit.service';
import { UnitResolver } from './unit-resolver.service';
import { UnitEditGuard } from './unit-guard.service';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UnitListComponent,
        data: { origin: "from :'', unitListcomponent", idx: 0}
      },
      {
        path: ':id',
        component: UnitDetailComponent,
        data: { origin: "from :'id', unitDetailComponent", idx: 1},
        resolve: { unit: UnitResolver }
      },
      {
        path: ':id/edit',
        component: UnitEditComponent,
        data: { origin: "from :'id/', unitEditComponent", idx: 2},
        resolve: { unit: UnitResolver },
        canDeactivate: [UnitEditGuard],
        children: [
          {
            path: '',
            redirectTo: 'info',
            pathMatch: 'full'
          },
          {
            path: 'info',
            component: UnitEditInfoComponent
          }
          // ,
          // {
          //   path: 'tags',
          //   component: UnitEditTagsComponent
          // }
        ]
      }
    ])
  ],
  declarations: [
    UnitListComponent,
    UnitDetailComponent,
    UnitEditComponent,
    UnitEditInfoComponent,
    UnitEditTagsComponent,
    UnitFilterPipe
  ],
  providers: [
    UnitService,
    UnitResolver,
    UnitEditGuard
  ]
})
export class UnitModule { }
