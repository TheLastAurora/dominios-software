import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicListComponent } from './public-list/public-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminListOptionComponent } from './admin-list-option/admin-list-option.component';
import { ButtonsModule } from '../buttons/buttons.module';



@NgModule({
  declarations: [
    PublicListComponent,
    AdminListComponent,
    AdminListOptionComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PublicListComponent,
    AdminListComponent,
    AdminListOptionComponent
  ]
})
export class ListsModule { }
