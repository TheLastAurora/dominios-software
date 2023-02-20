import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, switchMap, of } from 'rxjs';
import { Concurso } from 'src/app/models/concurso.model';
import { ConcursoService } from 'src/app/services/concurso.service';
import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-concurso-details',
  templateUrl: './concurso-details.component.html',
  styleUrls: ['./concurso-details.component.scss']
})
export class ConcursoDetailsComponent implements AfterViewInit {

  concursoId?: string | null;

  concurso?: Concurso;

  constructor(
    private service: ConcursoService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private splashScreen: SplashScreenService
  ) { }

  ngAfterViewInit(): void {
    this.getConcurso();
  }

  get cargo(): string {
    return this.concurso?.cargo ? this.concurso?.cargo : '';
  }

  get nome(): string {
    return this.concurso?.nome ? this.concurso?.nome : '';
  }

  get vagasAc(): string {
    return String(this.concurso?.vagas_ac);
  }

  get vagasPd(): string {
    return String(this.concurso?.vagas_pd);
  }

  get homologacao(): string {
    return String(this.concurso?.homologacao);
  }

  get createdAt(): string {
    return String(this.concurso?.createdAt);
  }

  get updatedAt(): string {
    return String(this.concurso?.updatedAt);
  }

  getConcurso(): void {
    this.splashScreen.start();
    this.service.getById().subscribe({
      next: data => {
        this.splashScreen.stop();
        this.concurso = data;
      }
      ,
      error: error => {
        this.splashScreen.stop();
        this.toast.error(error.error.message)
      }
    })
  }
}
