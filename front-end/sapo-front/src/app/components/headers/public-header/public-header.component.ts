import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss']
})
export class PublicHeaderComponent {

  constructor(
    private router: Router
  ) { }

  goToHome(): void {
    this.router.navigate(['public/home']);
  }

  goToResults(): void {
    this.router.navigate(['public/results']);
  }

  goToAdmin(): void {
    this.router.navigate(['auth']);
  }

}
