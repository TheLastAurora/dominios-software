import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-list-option',
  templateUrl: './admin-list-option.component.html',
  styleUrls: ['./admin-list-option.component.scss']
})
export class AdminListOptionComponent {

  @Input()
  data!: any;

  @Input()
  type!: string;

  @Output()
  event: EventEmitter<any> = new EventEmitter();

  constructor() { }

  submit(): void {
    this.event.emit();
  }

}
