import { ComponentsModule } from './../components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicHeaderComponent } from './public-header/public-header.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { ButtonsModule } from '../buttons/buttons.module';
import { AvatarModule } from '../avatar/avatar.module';



@NgModule({
  declarations: [
    PublicHeaderComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    AvatarModule
  ],
  exports: [
    PublicHeaderComponent,
    AdminHeaderComponent
  ]
})
export class HeadersModule { }
