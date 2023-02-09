import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({  
  selector: 'app-toast',  
  templateUrl: './toast.component.html',  
  styleUrls: ['./toast.component.scss']
})

export class ToastComponent implements OnInit {  
  toastClass!: string[];  
  toastMessage!: string;  
  showsToast!: boolean; 

  constructor(public toast: ToastService) { }  

  ngOnInit(): void {
  }

  dismiss(): void {    
    this.toast.dismissToast();  
  }
}