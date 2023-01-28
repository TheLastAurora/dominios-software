import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';



@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PublicModule { }
