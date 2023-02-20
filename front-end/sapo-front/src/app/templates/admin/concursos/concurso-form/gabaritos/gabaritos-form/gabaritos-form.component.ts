import { GabaritoService } from './../../../../../../services/gabarito.service';
import { ActivatedRoute } from '@angular/router';
import { Component, AfterViewInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { Gabarito } from 'src/app/models/gabarito.model';

@Component({
  selector: 'app-gabaritos-form',
  templateUrl: './gabaritos-form.component.html',
  styleUrls: ['./gabaritos-form.component.scss']
})
export class GabaritosFormComponent implements AfterViewInit {

  gabaritoId?: string | null;

  gabarito?: Gabarito;

  isNewGabarito?: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private service: GabaritoService,
    private toast: ToastService,
    private splashScreen: SplashScreenService
  ) { }

  ngAfterViewInit(): void {
      this.gabaritoId = this.route.snapshot.paramMap.get('gabaritoId');
      if(this.gabaritoId && this.gabaritoId != '0'){
        this.isNewGabarito = false;
        this.getGabarito();
      }
  }

  get tipo(): string {
    return String(this.gabarito?.tipo);
  }

  get respostas(): string {
    return String(this.gabarito?.respostas);
  }

  get updatedAt(): string {
    return String(this.gabarito?.updatedAt);
  }

  get createdAt(): string {
    return String(this.gabarito?.createdAt);
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

}
