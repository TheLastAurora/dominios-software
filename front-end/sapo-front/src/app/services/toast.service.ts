import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EventTypes, ToastEvent } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  public toasts: BehaviorSubject<ToastEvent[]> = new BehaviorSubject<ToastEvent[]>(new Array());

  constructor() {
  }

  success(message: string): void {
    this.show(EventTypes.success, "Sucesso", message);
  }

  warning(message: string): void {
    this.show(EventTypes.warning, "Atenção", message);
  }

  error(message: string): void {
    this.show(EventTypes.error, "Erro", message);
  }

  show(event: EventTypes, title: string, message: string): void {
    let toasts: ToastEvent[] = this.allToasts;
    const toast: ToastEvent = {title: title, message: message, type: event};
    toasts = [...toasts, toast];
    this.toasts.next(toasts);
    setTimeout(()=> {
      toasts.shift();
      this.toasts.next(toasts);
    }, 5000);
  }

  get allToasts(): ToastEvent[] {
    return this.toasts.value;
  }

}