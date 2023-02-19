import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicListComponent } from './public-list/public-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminListOptionComponent } from './admin-list-option/admin-list-option.component';



@NgModule({
  declarations: [
    PublicListComponent,
    AdminListComponent,
    AdminListOptionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PublicListComponent,
    AdminListComponent,
    AdminListOptionComponent
  ]
})
export class ListsModule { }
