import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RespostasComponent } from './respostas.component';
import { RespostasFormComponent } from './respostas-form/respostas-form.component';



@NgModule({
  declarations: [
    RespostasComponent,
    RespostasFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RespostasModule { }
