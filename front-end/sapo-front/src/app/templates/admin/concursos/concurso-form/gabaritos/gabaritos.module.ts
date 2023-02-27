import { ComponentsModule } from './../../../../../components/components.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
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
    CommonModule,
    AppRoutingModule,
    ComponentsModule
  ]
})
export class GabaritosModule { }
