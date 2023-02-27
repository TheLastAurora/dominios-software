import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RankingComponent } from './results/ranking/ranking.component';



@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent,
    ResultsComponent,
    RankingComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ComponentsModule
  ]
})
export class PublicModule { }
