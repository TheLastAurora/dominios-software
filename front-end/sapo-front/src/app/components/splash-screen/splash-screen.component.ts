import { Component, OnInit } from '@angular/core';
import { SplashScreenService } from 'src/app/services/splash-screen.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent {

  constructor(
    private service: SplashScreenService
  ) { }

  get state(): boolean{
    return this.service.getBehavior().value;
  }

}
