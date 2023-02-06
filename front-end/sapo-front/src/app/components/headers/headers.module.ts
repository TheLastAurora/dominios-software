import { ComponentsModule } from './../components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicHeaderComponent } from './public-header/public-header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { ButtonsModule } from '../buttons/buttons.module';



@NgModule({
  declarations: [
    PublicHeaderComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule
  ],
  exports: [
    PublicHeaderComponent,
    AdminHeaderComponent
  ]
})
export class HeadersModule { }
