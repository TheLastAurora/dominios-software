import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConcursoService } from 'src/app/services/concurso.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  storedData: any;

  filterForm?: FormGroup;

  @Input()
  data!: any;

  @Input()
  type!: string;

  constructor(
    private router: Router,
    private concursoService: ConcursoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createFilterForm();
  }

  get id(): FormControl {
    return this.filterForm?.controls['id'] as FormControl;
  }

  get cargo(): FormControl {
    return this.filterForm?.controls['cargo'] as FormControl;
  }

  get empresa(): FormControl {
    return this.filterForm?.controls['empresa'] as FormControl;
  }

  get nome(): FormControl {
    return this.filterForm?.controls['nome'] as FormControl;
  }

  get cpf(): FormControl {
    return this.filterForm?.controls['cpf'] as FormControl;
  }

  get tipo(): FormControl {
    return this.filterForm?.controls['tipo'] as FormControl;
  }

  createFilterForm(): void {
    this.filterForm = this.fb.group({
      id: [''],
      cargo: [''],
      empresa: [''],
      nome: [''],
      cpf: [''],
      tipo: [''],
    })
  }

  goToTab(id: string): void{
    switch(this.type){
      case 'concurso':
        this.router.navigate([`admin/${this.type}/${id}`]);
        break;
      default:
        this.router.navigate([`admin/concurso/${this.concursoService.concursoId}/${this.type}/${id}`]);
    }
  }

}
