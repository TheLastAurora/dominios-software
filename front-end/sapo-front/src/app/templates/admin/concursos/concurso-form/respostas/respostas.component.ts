import { ConcursoService } from './../../../../../services/concurso.service';
import { AfterViewInit, Component } from '@angular/core';
import { Candidato } from 'src/app/models/candidato.model';
import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-respostas',
  templateUrl: './respostas.component.html',
  styleUrls: ['./respostas.component.scss']
})
export class RespostasComponent implements AfterViewInit {

  candidatos!: Candidato[];

  constructor(
    private service: ConcursoService,
    private toast: ToastService,
    private splashScreen: SplashScreenService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
      this.getCandidatos();
  }

  newAnswer(): void {
    this.router.navigate([`/admin/concurso/${this.service.concursoId}/files`]);
  }

  getCandidatos(): void {
    this.splashScreen.start();
    this.service.getAllCandidatos().subscribe({
      next: data => {
        this.candidatos = data;
        this.splashScreen.stop();
      },
      error: error => {
        this.splashScreen.stop();
        this.toast.error(error.error.message);
      }
    })
  }

}
