import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GabaritosComponent } from './gabaritos.component';
import { GabaritosFormComponent } from './gabaritos-form/gabaritos-form.component';



@NgModule({
  declarations: [
    GabaritosComponent,
    GabaritosFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GabaritosModule { }
