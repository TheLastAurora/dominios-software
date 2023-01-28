import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcursoFormComponent } from './concurso-form.component';
import { ConcursoDetailsComponent } from './concurso-details/concurso-details.component';



@NgModule({
  declarations: [
    ConcursoFormComponent,
    ConcursoDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ConcursoFormModule { }
