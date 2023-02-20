import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {

  constructor(
    private router: Router
  ) { }

  goToConcursos(): void {
    this.router.navigate(['admin/concursos']);
  }

}
