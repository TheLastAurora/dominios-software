import { FileFormComponent } from './templates/admin/concursos/concurso-form/respostas/file-form/file-form.component';
import { RespostasFormComponent } from './templates/admin/concursos/concurso-form/respostas/respostas-form/respostas-form.component';
import { GabaritosFormComponent } from './templates/admin/concursos/concurso-form/gabaritos/gabaritos-form/gabaritos-form.component';
import { RespostasComponent } from './templates/admin/concursos/concurso-form/respostas/respostas.component';
import { GabaritosComponent } from './templates/admin/concursos/concurso-form/gabaritos/gabaritos.component';
import { SignupComponent } from './templates/auth/signup/signup.component';
import { AdminComponent } from './templates/admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './templates/auth/auth.component';
import { HomeComponent } from './templates/public/home/home.component';
import { PublicComponent } from './templates/public/public.component';
import { ErrorComponent } from './templates/error/error.component';
import { ResultsComponent } from './templates/public/results/results.component';
import { LoginComponent } from './templates/auth/login/login.component';
import { ConcursosComponent } from './templates/admin/concursos/concursos.component';
import { ConcursoFormComponent } from './templates/admin/concursos/concurso-form/concurso-form.component';
import { ConcursoDetailsComponent } from './templates/admin/concursos/concurso-form/concurso-details/concurso-details.component';

const routes: Routes = [
  {path: 'public', component: PublicComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'results', component: ResultsComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'}
  ]},
  {path: 'auth', component: AuthComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'}
  ]},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'concursos', component: ConcursosComponent},
    {path: 'concurso/:id', component: ConcursoFormComponent, children: [
      {path: 'details', component: ConcursoDetailsComponent},
      {path: 'gabaritos', component: GabaritosComponent},
      {path: 'gabarito/:gabaritoId', component: GabaritosFormComponent},
      {path: 'respostas', component: RespostasComponent},
      {path: 'candidato/:candidatoId', component: RespostasFormComponent},
      {path: 'files', component: FileFormComponent},
      {path: '', redirectTo: 'details', pathMatch: 'full'}
    ]},
    {path: '', redirectTo: 'concursos', pathMatch: 'full'}
  ]},
  {path: '', redirectTo: 'public', pathMatch: 'full'},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
