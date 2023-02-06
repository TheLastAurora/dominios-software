import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatButtonComponent } from './flat-button/flat-button.component';
import { SquareButtonComponent } from './square-button/square-button.component';
import { TextButtonComponent } from './text-button/text-button.component';



@NgModule({
  declarations: [
    FlatButtonComponent,
    SquareButtonComponent,
    TextButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FlatButtonComponent,
    SquareButtonComponent,
    TextButtonComponent
  ]
})
export class ButtonsModule { }
