import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  goToTab(id: string): void{
    this.router.navigate([`admin/${this.type}/${id}`]);
  }

}
