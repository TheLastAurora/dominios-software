import { ToastService } from 'src/app/services/toast.service';
import { ConcursoService } from './../../../../services/concurso.service';
import { Component, OnInit } from '@angular/core';
import { Concurso } from 'src/app/models/concurso.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SplashScreenService } from 'src/app/services/splash-screen.service';

@Component({
  selector: 'app-concurso-form',
  templateUrl: './concurso-form.component.html',
  styleUrls: ['./concurso-form.component.scss']
})
export class ConcursoFormComponent implements OnInit {

  concursoId?: string | null;

  constructor(
    private route: ActivatedRoute,
    private service: ConcursoService
  ) { }

  ngOnInit(): void {
    this.concursoId = this.route.snapshot.paramMap.get('id');
    this.service.setConcursoId(Number(this.concursoId));
  }

}
