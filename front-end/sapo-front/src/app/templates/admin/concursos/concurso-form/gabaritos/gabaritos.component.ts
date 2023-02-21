import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { Component, AfterViewInit } from '@angular/core';
import { ConcursoService } from 'src/app/services/concurso.service';
import { ToastService } from 'src/app/services/toast.service';
import { Gabarito } from 'src/app/models/gabarito.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gabaritos',
  templateUrl: './gabaritos.component.html',
  styleUrls: ['./gabaritos.component.scss']
})
export class GabaritosComponent implements AfterViewInit {

  gabaritos?: Gabarito[];

  constructor(
    private service: ConcursoService,
    private toast: ToastService,
    private splashScreen: SplashScreenService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.splashScreen.start();
    this.service.getAllGabaritos().subscribe({
      next: data => {
        this.gabaritos = data;
        this.splashScreen.stop();
      }
      ,
      error: error => {
        this.toast.error(error.error.message);
        this.splashScreen.stop();
      }
    })
  }

  newGabarito(): void {
    this.router.navigate([`admin/concurso/${this.service.concursoId}/gabarito/0`]);
  }

}
