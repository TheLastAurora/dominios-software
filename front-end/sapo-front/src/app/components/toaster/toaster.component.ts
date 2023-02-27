import { Component, OnInit } from '@angular/core';
import { ToastEvent } from 'src/app/models/toast.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {

  constructor(
    private service: ToastService
  ) { }

  get toasts(): ToastEvent[] {
    return this.service.allToasts;
  }

}
