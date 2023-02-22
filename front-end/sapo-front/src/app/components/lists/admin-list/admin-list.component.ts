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

  isFiltered: boolean = false;

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

  get nota(): FormControl {
    return this.filterForm?.controls['nota'] as FormControl;
  }

  createFilterForm(): void {
    this.filterForm = this.fb.group({
      id: [''],
      cargo: [''],
      empresa: [''],
      nome: [''],
      cpf: [''],
      tipo: [''],
      nota: ['']
    })
  }

  clearFilter(): void {
    this.id.setValue('');
    this.cargo.setValue('');
    this.empresa.setValue('');
    this.nome.setValue('');
    this.cpf.setValue('');
    this.tipo.setValue('');
    this.nota.setValue('');
    this.isFiltered = false;
    this.data = this.storedData;
  }

  applyFilter(): void {
    if(this.isFiltered)
      this.data = this.storedData;
    this.storedData = this.data;
    if(this.id.value && this.id.value != ''){
      this.data = this.data.filter((val: any) => {
        return val.id == this.id.value;
      })
    }
    if(this.cargo.value && this.cargo.value != ''){
      this.data = this.data.filter((val: any) => {
        return String(val.cargo).match(this.cargo.value);
      })
    }
    if(this.empresa.value && this.empresa.value != ''){
      this.data = this.data.filter((val: any) => {
        return String(val.empresa).match(this.empresa.value);
      })
    }
    if(this.nome.value && this.nome.value != ''){
      this.data = this.data.filter((val: any) => {
        return String(val.nome).match(this.nome.value);
      })
    }
    if(this.cpf.value && this.cpf.value != ''){
      this.data = this.data.filter((val: any) => {
        return String(val.cpf).match(this.cpf.value);
      })
    }
    if(this.tipo.value && this.tipo.value != ''){
      this.data = this.data.filter((val: any) => {
        return String(val.tipo).match(this.tipo.value);
      })
    }
    if(this.nota.value && this.nota.value != ''){
      this.data = this.data.filter((val: any) => {
        return val.nota == this.nota.value;
      })
    }
    this.isFiltered = true;
  }

  goToTab(id: string): void{
    switch(this.type){
      case 'concurso':
        this.router.navigate([`admin/${this.type}/${id}`]);
        break;
      case 'concursos':
        this.concursoService.setConcursoId(Number(id));
        this.router.navigate([`public/ranking`]);
        break;
      default:
        this.router.navigate([`admin/concurso/${this.concursoService.concursoId}/${this.type}/${id}`]);
    }
  }

}
