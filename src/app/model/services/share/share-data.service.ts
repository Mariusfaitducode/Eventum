import { Injectable } from '@angular/core';
import { Event } from 'src/app/model/classes/event/event';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  agendaDayEvent: Subject<[Date, Event[]]> = new Subject<[Date, Event[]]>();
  success: boolean = false;
  successAdd: boolean = false;
  successProfile: boolean = false;

  constructor() { }

  public setAgendaDayEvent(date: Date, events: Event[]) {
    const data:[Date, Event[]] = [date, events];
    this.agendaDayEvent.next(data);
  }

  public getAgendaDayEvent() {
    return this.agendaDayEvent;
  }

  // verification succès ou échec de modification d'un événement
  public setSuccessEvent(){
    this.success = true;

    // timer
    setTimeout(() => {
      this.success = false;
    }, 3000);

  }

  public getSuccessEvent(){
    return this.success;
  }

  public setSuccessAddEvent(){
    this.successAdd = true;

    // timer
    setTimeout(() => {
      this.successAdd = false;
    }
    , 3000);
  }

  public getSuccessAddEvent(){
    return this.successAdd;
  }

  public setSuccessProfil(){
    this.successProfile = true;

    // timer
    setTimeout(() => {
      this.successProfile = false;
    }
    , 3000);
  }

  public getSuccessProfil(){
    return this.successProfile;
  }

}
