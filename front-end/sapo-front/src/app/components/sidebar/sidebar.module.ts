import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { ButtonsModule } from '../buttons/buttons.module';



@NgModule({
  declarations: [
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule
  ],
  exports: [
    AdminSidebarComponent
  ]
})
export class SidebarModule { }
