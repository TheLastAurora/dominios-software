import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicListComponent } from './public-list/public-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';



@NgModule({
  declarations: [
    PublicListComponent,
    AdminListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ListsModule { }
