import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-square-button',
  templateUrl: './square-button.component.html',
  styleUrls: ['./square-button.component.scss']
})
export class SquareButtonComponent {

  @Input()
  icon?: string;

  @Output()
  event: EventEmitter<any> = new EventEmitter();

  constructor() { }

  get iconPath(): string{
    return `./../../../assets/imgs/icons/${this.icon}.png`;
  }

  submit(): void {
    this.event.emit();
  }

}
