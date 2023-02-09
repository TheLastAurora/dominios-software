import { ConcursosModule } from './concursos/concursos.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ComponentsModule,
    ConcursosModule
  ]
})
export class AdminModule { }
