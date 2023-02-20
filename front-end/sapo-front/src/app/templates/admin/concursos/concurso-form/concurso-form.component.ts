import { ConcursoService } from './../../../../services/concurso.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-concurso-form',
  templateUrl: './concurso-form.component.html',
  styleUrls: ['./concurso-form.component.scss']
})
export class ConcursoFormComponent implements OnInit {

  concursoId?: string | null;

  constructor(
    private route: ActivatedRoute,
    private service: ConcursoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.concursoId = this.route.snapshot.paramMap.get('id');
    this.service.setConcursoId(Number(this.concursoId));
  }

  goToDetails(): void {
    this.router.navigate([`admin/concurso/${this.concursoId}/details`]);
  }

  goToGabaritos(): void {
    this.router.navigate([`admin/concurso/${this.concursoId}/gabaritos`]);
  }

  goToRespostas(): void {
    this.router.navigate([`admin/concurso/${this.concursoId}/respostas`]);
  }

}
