import { Component, Input } from '@angular/core';
import { ToastEvent, EventTypes } from 'src/app/models/toast.model';

@Component({  
  selector: 'app-toast',  
  templateUrl: './toast.component.html',  
  styleUrls: ['./toast.component.scss']
})

export class ToastComponent {  
  
  @Input()
  toast!: ToastEvent;

  constructor() { }  

  get title(): string {
    return this.toast.title;
  }

  get message(): string {
    return this.toast.message;
  }

  get type(): string {
    return `container ${EventTypes[this.toast.type]}`;
  }

}