import { Injectable } from '@angular/core';
import { Event } from 'src/app/model/classes/event/event';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private successSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public success$: Observable<boolean> = this.successSubject.asObservable();


  agendaDayEvent: Subject<[Date, Event[]]> = new Subject<[Date, Event[]]>();
  successModify: boolean = false;
  successAdd: boolean = false;
  successProfile: boolean = false;

  constructor() { }

  public setAgendaDayEvent(date: Date, events: Event[]) {
    const data: [Date, Event[]] = [date, events];
    this.agendaDayEvent.next(data);
  }

  public getAgendaDayEvent() {
    return this.agendaDayEvent;
  }

  // Verify success or failure of modifying an event
  public setSuccessModifyEvent() {
    this.successModify = true;
    this.emitSuccess(this.successModify);

    // Timer
    setTimeout(() => {
      this.successModify = false;
    }, 3000);
  }

  emitSuccess(success: boolean): void {

    this.successSubject.next(success);
  }

  public getSuccessModifyEvent() {
    return this.successModify;
  }

  public setSuccessAddEvent() {
    this.successAdd = true;

    // Timer
    setTimeout(() => {
      this.successAdd = false;
    }, 3000);
  }

  public getSuccessAddEvent() {
    return this.successAdd;
  }

  public setSuccessProfil() {
    this.successProfile = true;

    // Timer
    setTimeout(() => {
      this.successProfile = false;
    }, 3000);
  }

  public getSuccessProfil() {
    return this.successProfile;
  }
}
