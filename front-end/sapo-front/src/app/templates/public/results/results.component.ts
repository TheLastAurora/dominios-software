import { ToastService } from './../../../services/toast.service';
import { SplashScreenService } from './../../../services/splash-screen.service';
import { Component, AfterViewInit } from '@angular/core';
import { Concurso } from 'src/app/models/concurso.model';
import { ConcursoService } from 'src/app/services/concurso.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements AfterViewInit {

  data?: Concurso[];

  constructor(
    private service: ConcursoService,
    private splashScreen: SplashScreenService,
    private toast: ToastService
  ) { }

  ngAfterViewInit(): void {
      this.getConcludedConcursos();
  }

  getConcludedConcursos(): void {
    this.splashScreen.start();
    this.service.getConcludedConcursos().subscribe({
      next: data => {
        this.data = data;
        this.splashScreen.stop();
      },
      error: error => {
        this.toast.error(error.error.message);
        this.splashScreen.stop();
      }
    })
  }

}
