import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConcursoService } from 'src/app/services/concurso.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent {

  @Input()
  data!: any;

  @Input()
  type!: string;

  constructor(
    private router: Router,
    private concursoService: ConcursoService
  ) { }

  goToTab(id: string): void{
    switch(this.type){
      case 'concurso':
        this.router.navigate([`admin/${this.type}/${id}`]);
        break;
      case 'gabarito':
        this.router.navigate([`admin/concurso/${this.concursoService.concursoId}/${this.type}/${id}`]);
        break;
    }
  }

}
