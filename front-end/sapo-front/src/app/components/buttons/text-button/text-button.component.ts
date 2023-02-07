import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.scss']
})
export class TextButtonComponent {

  @Input()
  text?: string;

  @Output()
  event: EventEmitter<any> = new EventEmitter();

  constructor() { }

  submit(): void{
    this.event.emit();
  }

}
