import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-flat-button',
  templateUrl: './flat-button.component.html',
  styleUrls: ['./flat-button.component.scss']
})
export class FlatButtonComponent {

  @Input()
  buttonText?: string;

  @Output()
  event: EventEmitter<any> = new EventEmitter();

  constructor() { }

  submit() {
    this.event.emit();
  }

  get text() {
    return this.buttonText?.toUpperCase();
  }

}
