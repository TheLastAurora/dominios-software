import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RespostasComponent } from './respostas.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ComponentsModule } from './../../../../../components/components.module';
import { RespostasFormComponent } from './respostas-form/respostas-form.component';
import { FileFormComponent } from './file-form/file-form.component';



@NgModule({
  declarations: [
    RespostasComponent,
    RespostasFormComponent,
    FileFormComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ComponentsModule
  ]
})
export class RespostasModule { }
