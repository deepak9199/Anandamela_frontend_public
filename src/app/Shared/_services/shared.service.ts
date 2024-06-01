import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private functionTriggerSubject = new Subject<void>();
  private functionTriggerSubjectCart = new Subject<void>();
  private functionTriggerSubjectSearch = new Subject<void>();
  private functionTriggerSubjectwishlist = new Subject<void>();
  private functionTriggerSubjectsidemenu = new Subject<void>();
  private functionTriggerSubjectsidemenureset = new Subject<void>();
  private functionTriggerSubjectfootershow = new Subject<void>();
  private functionTriggerSubjectfooterhide = new Subject<void>();
  private functionTriggerSubjectvoice = new Subject<void>();
  // Method to trigger the function call
  triggerFunction() {
    this.functionTriggerSubject.next();
  }
  triggerFunctionvoice() {
    this.functionTriggerSubjectvoice.next();
  }
  triggersidemenuresetFunction() {
    this.functionTriggerSubjectsidemenureset.next();
  }
  triggerCartFunction() {
    this.functionTriggerSubjectCart.next();
  }
  triggerSearchFunction() {
    this.functionTriggerSubjectSearch.next();
  }
  triggerwishlistFunction() {
    this.functionTriggerSubjectwishlist.next();
  }
  triggersidemenuFunction() {
    this.functionTriggerSubjectsidemenu.next();
  }
  triggerfootershowFunction() {
    this.functionTriggerSubjectfootershow.next();
  }
  triggerfooterhideFunction() {
    this.functionTriggerSubjectfooterhide.next();
  }

  // Observable for components to subscribe to
  get functionTriggerObservable() {
    return this.functionTriggerSubject.asObservable();
  }
  get functionTriggerObservablevoice() {
    return this.functionTriggerSubjectvoice.asObservable();
  }
  get functionTriggerCartObservable() {
    return this.functionTriggerSubjectCart.asObservable();
  }
  get functionTriggerObservableSearch() {
    return this.functionTriggerSubjectSearch.asObservable();
  }
  get functionTriggerObservablewishlist() {
    return this.functionTriggerSubjectwishlist.asObservable();
  }
  get functionTriggerObservablesodemenu() {
    return this.functionTriggerSubjectsidemenu.asObservable();
  }
  get functionTriggerObservablesodemenureset() {
    return this.functionTriggerSubjectsidemenureset.asObservable();
  }
  get functionTriggerObservablefootershow() {
    return this.functionTriggerSubjectfootershow.asObservable();
  }
  get functionTriggerObservablefooterhide() {
    return this.functionTriggerSubjectfooterhide.asObservable();
  }
}
