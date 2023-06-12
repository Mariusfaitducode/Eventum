import { Injectable, Output, EventEmitter } from '@angular/core'
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Event } from '../../classes/event/event'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  redirectUrl!: string;
  baseUrl: string = "http://localhost/eventum/Eventum_Angular/php";

  constructor(private httpClient: HttpClient) { }

  public getEvents() {
    return this.httpClient.get<Event[]>(this.baseUrl + '/evenement.php').pipe(map(Events => {
        return Events;
    }));
  }


  public getEventById(id: number) {
      return this.httpClient.get<Event>(this.baseUrl + '/evenement.php?id=' + id).pipe(map(Event => {
          return Event;
      }));
  }
  // TODO
  public getEventbyName(name: string) {
  }

  public getEventbyUser(id: number) {
  }

}


