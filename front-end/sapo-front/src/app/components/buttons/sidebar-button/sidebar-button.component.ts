import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  templateUrl: './sidebar-button.component.html',
  styleUrls: ['./sidebar-button.component.scss']
})
export class SidebarButtonComponent {

  @Input()
  text!: string;

  @Input()
  icon!: string;

  @Output()
  event: EventEmitter<any> = new EventEmitter();

  constructor() { }

  get iconPath(): string{
    return `./../../../assets/imgs/icons/${this.icon}.png`;
  }

  submit(): void{
    this.event.emit();
  }

}
