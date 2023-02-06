import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { AppRoutingModule } from 'src/app/app-routing.module';



@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ComponentsModule
  ]
})
export class PublicModule { }
