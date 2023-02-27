import { SplashScreenService } from './../../../../services/splash-screen.service';
import { ConcursoService } from 'src/app/services/concurso.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { Candidato } from 'src/app/models/candidato.model';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements AfterViewInit {

  data?: Candidato[];

  constructor(
    private service: ConcursoService,
    private splashScreen: SplashScreenService,
    private toast: ToastService
  ) { }

  ngAfterViewInit(): void {
      this.getCandidatos();
  }

  getCandidatos(): void {
    this.splashScreen.start();
    this.service.getConcludedConcursoCandidatos().subscribe({
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
