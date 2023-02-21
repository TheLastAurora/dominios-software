import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CandidatoService } from 'src/app/services/candidato.service';
import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { ToastService } from 'src/app/services/toast.service';
import { Candidato } from 'src/app/models/candidato.model';

@Component({
  selector: 'app-respostas-form',
  templateUrl: './respostas-form.component.html',
  styleUrls: ['./respostas-form.component.scss']
})
export class RespostasFormComponent implements AfterViewInit {

  candidatoId?: string;

  candidato?: Candidato;

  constructor(
    private service: CandidatoService,
    private toast: ToastService,
    private splashScreen: SplashScreenService,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit(): void {
      this.candidatoId = String(this.route.snapshot.paramMap.get('candidatoId'));
      this.getCandidato();
  }

  get nome(): string {
    return this.candidato?.nome ? this.candidato?.nome : '';
  }

  get cpf(): string {
    return this.candidato?.cpf ? this.candidato?.cpf : '';
  }

  get genero(): string {
    return String(this.candidato?.genero) == 'M' ? 'Masculino' : 'Feminino';
  }

  get dataNascimento(): string {
    return String(this.candidato?.data_nascimento);
  }

  get rg(): string {
    return this.candidato?.rg ? this.candidato?.rg : '';
  }

  get dataExpedicao(): string {
    return String(this.candidato?.data_expedicao);
  }

  get nomeMae(): string {
    return this.candidato?.nome_mae ? this.candidato?.nome_mae : '';
  }

  get nomePai(): string {
    return this.candidato?.nome_pai ? this.candidato?.nome_pai : '';
  }

  get email(): string {
    return this.candidato?.email ? this.candidato?.email : '';
  }

  get telefone(): string {
    return this.candidato?.telefone ? this.candidato?.telefone : '';
  }

  get uf(): string {
    return String(this.candidato?.uf);
  }

  get cep(): string {
    return this.candidato?.cep ? this.candidato?.cep : '';
  }

  get logradouro(): string {
    return this.candidato?.logradouro ? this.candidato?.logradouro : '';
  }

  get codMunicipio(): string {
    return this.candidato?.cod_municipio ? this.candidato?.cod_municipio : '';
  }

  get bairro(): string {
    return this.candidato?.bairro ? this.candidato?.bairro : '';
  }

  get complemento(): string {
    return this.candidato?.complemento ? this.candidato?.complemento : '';
  }

  get numero(): string {
    return this.candidato?.numero ? this.candidato?.numero : '';
  }

  get nota(): string {
    return String(this.candidato?.nota);
  }

  get updatedAt(): string {
    return String(this.candidato?.updatedAt);
  }

  get createdAt(): string {
    return String(this.candidato?.createdAt);
  }

  getCandidato(): void {
    this.splashScreen.start();
    this.service.getById(Number(this.candidatoId)).subscribe({
      next: data => {
        this.candidato = data;
        this.splashScreen.stop();
      },
      error: error => {
        this.toast.error(error.error.message);
        this.splashScreen.stop();
      }
    })
  }

}
