import { ToastService } from './../../../services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {

  constructor(
    private service: AuthService,
    private toast: ToastService
  ) { }

  logout(): void {
    this.service.logout();
    this.toast.warning("Usuário deslogado");
  }

}
