import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConcursoService } from 'src/app/services/concurso.service';
import { SplashScreenService } from 'src/app/services/splash-screen.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss']
})
export class FileFormComponent {

  sentFile: boolean = true;

  image: any;

  constructor(
    private toast: ToastService,
    private splashScreen: SplashScreenService,
    private service: ConcursoService,
    private router: Router
  ) { }

  selectImage(event: any): void {
    if(event.target.files.length > 0)
      this.image = event.target.files[0];
  }

  goBack(): void {
    this.router.navigate([`/admin/concurso${this.service.concursoId}/gabaritos`]);
  }

  submit(): void {
    this.splashScreen.start();
    const formData = new FormData();
    formData.append('file', this.image);
    this.service.sendAnswersFile(formData).subscribe({
      next: data => {
        this.toast.success('Arquivo enviado com sucesso');
        this.splashScreen.stop();
        this.router.navigate([`/admin/concurso/${this.service.concursoId}/respostas`]);
      }
      ,
      error: error => {
        this.toast.error(error.error.message);
        this.splashScreen.stop();
      }
    })
  }

}
