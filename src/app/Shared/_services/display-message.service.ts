import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisplayMessageService {
  private messageSubject = new BehaviorSubject<{
    message: string;
    type: 'success' | 'error';
  }>({
    message: 'Welcome',
    type: 'success',
  });

  getMessage() {
    return this.messageSubject.asObservable();
  }

  showSuccess(message: string) {
    this.messageSubject.next({ message, type: 'success' });
  }

  showError(message: string) {
    this.messageSubject.next({ message, type: 'error' });
  }
}
