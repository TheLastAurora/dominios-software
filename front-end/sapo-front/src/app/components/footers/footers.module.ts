import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicFooterComponent } from './public-footer/public-footer.component';



@NgModule({
  declarations: [
    PublicFooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PublicFooterComponent
  ]
})
export class FootersModule { }
