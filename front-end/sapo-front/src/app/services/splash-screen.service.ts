import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {

  private behavior = new BehaviorSubject<boolean>(false);

  constructor() { }

  start(): void {
    this.behavior.next(true);
  }

  stop(): void {
    this.behavior.next(false);
  }

  getBehavior(): BehaviorSubject<boolean> {
    return this.behavior;
  }
}
