import { ComponentsModule } from './../../../components/components.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcursosComponent } from './concursos.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ConcursoFormModule } from './concurso-form/concurso-form.module';

@NgModule({
  declarations: [
    ConcursosComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ComponentsModule,
    ConcursoFormModule
  ]
})
export class ConcursosModule { }
