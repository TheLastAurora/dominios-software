import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcursosComponent } from './concursos.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    ConcursosComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class ConcursosModule { }
