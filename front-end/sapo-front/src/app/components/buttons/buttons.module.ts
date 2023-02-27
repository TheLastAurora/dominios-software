import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatButtonComponent } from './flat-button/flat-button.component';
import { SquareButtonComponent } from './square-button/square-button.component';
import { TextButtonComponent } from './text-button/text-button.component';
import { SidebarButtonComponent } from './sidebar-button/sidebar-button.component';



@NgModule({
  declarations: [
    FlatButtonComponent,
    SquareButtonComponent,
    TextButtonComponent,
    SidebarButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FlatButtonComponent,
    SquareButtonComponent,
    TextButtonComponent,
    SidebarButtonComponent
  ]
})
export class ButtonsModule { }
