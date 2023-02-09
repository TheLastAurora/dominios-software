import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EventTypes, ToastEvent } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  public showsToast$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);  

  // The message string that'll bind and display on the toast
  public toastMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('Default Toast Message');  

  // The state that will add a style class to the component
  public toastState$: BehaviorSubject<string> = new BehaviorSubject<string>(`${EventTypes.success}`);  

  constructor() {
  }

  showToast(toastState: string, toastMsg: string): void {  
    // Observables use '.next()' to indicate what they want done with observable    
    // This will update the toastState to the toastState passed into the function
    this.toastState$.next(toastState);    

    // This updates the toastMessage to the toastMsg passed into the function
    this.toastMessage$.next(toastMsg);    

    // This will update the showsToast trigger to 'true'
    this.showsToast$.next(true);   
  }  

  // This updates the showsToast behavioursubject to 'false'  
  dismissToast(): void {    
    this.showsToast$.next(false);  
  }

}