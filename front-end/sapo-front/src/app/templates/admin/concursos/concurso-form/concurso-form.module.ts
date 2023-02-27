import { GabaritosModule } from './gabaritos/gabaritos.module';
import { ConcursoDetailsComponent } from './concurso-details/concurso-details.component';
import { ComponentsModule } from './../../../../components/components.module';
import { AppRoutingModule } from './../../../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcursoFormComponent } from './concurso-form.component';
import { RespostasComponent } from './respostas/respostas.component';
import { RespostasFormComponent } from './respostas/respostas-form/respostas-form.component';



@NgModule({
  declarations: [
    ConcursoFormComponent,
    ConcursoDetailsComponent,
    RespostasComponent,
    RespostasFormComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ComponentsModule,
    GabaritosModule
  ]
})
export class ConcursoFormModule { }
