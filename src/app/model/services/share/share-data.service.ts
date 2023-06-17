import { Injectable } from '@angular/core';
import { Event } from 'src/app/model/classes/event/event';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  agendaDayEvent: Subject<[Date, Event[]]> = new Subject<[Date, Event[]]>();
  success: boolean = false;

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


  }

  public getSuccessEvent(){
    return this.success;
  }

}
