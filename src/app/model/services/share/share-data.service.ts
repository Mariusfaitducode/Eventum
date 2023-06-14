import { Injectable } from '@angular/core';
import { Event } from 'src/app/model/classes/event/event';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  agendaDayEvent: Subject<Event[]> = new Subject<Event[]>();

  constructor() { }

  public setAgendaDayEvent(events: Event[]) {
    this.agendaDayEvent.next(events);
  }

  public getAgendaDayEvent() {
    return this.agendaDayEvent;
  }
}
