import { GabaritoAttrs } from './../../../../../../models/gabarito.model';
import { GabaritoService } from './../../../../../../services/gabarito.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { Gabarito } from 'src/app/models/gabarito.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ConcursoService } from 'src/app/services/concurso.service';

@Component({
  selector: 'app-gabaritos-form',
  templateUrl: './gabaritos-form.component.html',
  styleUrls: ['./gabaritos-form.component.scss']
})
export class GabaritosFormComponent implements OnInit {

  gabaritoForm!: FormGroup;

  gabaritoId?: string | null;

  gabarito?: Gabarito;

  gabaritoAttrs: GabaritoAttrs = {
    tipo: '',
    respostas: JSON.parse('{}')
  };

  isNewGabarito?: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private service: GabaritoService,
    private concursoService: ConcursoService,
    private toast: ToastService,
    private splashScreen: SplashScreenService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.splashScreen.start();
    this.gabaritoId = this.route.snapshot.paramMap.get('gabaritoId');
    this.checkComponentState();
    this.splashScreen.stop();
  }

  get tipo(): string {
    return String(this.gabarito?.tipo);
  }

  get respostas(): JSON | undefined {
    return this.gabarito?.respostas;
  }

  get updatedAt(): string {
    return String(this.gabarito?.updatedAt);
  }

  get createdAt(): string {
    return String(this.gabarito?.createdAt);
  }

  get tipoControl(): FormControl {
    return this.gabaritoForm?.controls['tipo'] as FormControl;
  }

  get respostasControl(): FormControl {
    return this.gabaritoForm?.controls['respostas'] as FormControl;
  }

  checkComponentState(): void {
    if(this.gabaritoId != '0'){
      this.isNewGabarito = !this.isNewGabarito;
      this.getGabarito();
    }
    else
      this.createForm();
  }

  createForm(): void {
    this.gabaritoForm = this.fb.group({
      tipo: ['', Validators.required],
      respostas: ['', Validators.required]
    })
  }

  getGabarito(): void {
      this.splashScreen.start();
      this.service.getById(Number(this.gabaritoId)).subscribe({
        next: data => {
          this.gabarito = data;
          this.splashScreen.stop();
        }
        ,
        error: error => {
          this.toast.error(error.error.message);
          this.splashScreen.stop();
        }
      })
  }

  print(): void {
    console.log(this.tipoControl);
    console.log(this.respostasControl);
  }

  submit(): void {
    this.splashScreen.start();
    this.gabaritoAttrs.tipo = this.tipoControl.value;
    this.gabaritoAttrs.respostas = JSON.parse(this.respostasControl.value);
    this.service.create(this.gabaritoAttrs as Gabarito).subscribe({
      next: data => {
        this.toast.success(data.message);
        this.splashScreen.stop();
        this.router.navigate([`admin/concurso/${this.concursoService.concursoId}/gabaritos`]);
      }
      ,
      error: error => {
        this.toast.error(error.error.message);
        this.splashScreen.stop();
      }
    })
  }

}
