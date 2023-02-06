import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicCardComponent } from './public-card/public-card.component';



@NgModule({
  declarations: [
    PublicCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PublicCardComponent
  ]
})
export class CardsModule { }
