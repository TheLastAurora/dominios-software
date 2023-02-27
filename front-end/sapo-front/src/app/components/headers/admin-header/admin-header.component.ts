import { ToastService } from './../../../services/toast.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  username?: string;

  constructor(
    private service: AuthService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
      this.getCurrentUser();
  }

  logout(): void {
    this.service.logout();
    this.toast.warning("Usuário deslogado");
  }

  getCurrentUser(): void {
    this.service.getCurrentUser().subscribe({
      next: data => this.username = data.credentials.login
    })
  }

}
