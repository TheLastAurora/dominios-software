import { ConcursoService } from './../../../services/concurso.service';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Component, OnInit } from '@angular/core';
import { Concurso } from 'src/app/models/concurso.model';
import { ToastService } from 'src/app/services/toast.service';
import { FormBuilder } from '@angular/forms';
import { SplashScreenService } from 'src/app/services/splash-screen.service';

@Component({
  selector: 'app-concursos',
  templateUrl: './concursos.component.html',
  styleUrls: ['./concursos.component.scss']
})
export class ConcursosComponent implements OnInit {

  concursos?: any;

  constructor(
    private service: ConcursoService,
    private toast: ToastService,
    private splashScreen: SplashScreenService
  ) { }

  ngOnInit(): void {
    this.getConcursos();
  }

  getConcursos(): void {
    this.splashScreen.start();
    this.service.getAll().subscribe({
      next: (data) => {
        this.concursos = data;
        this.splashScreen.stop();
      }
      ,
      error: (error) => 
        this.toast.error(error.error.message)
    });
  }

}
