import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../../classes/user/user';
import { Event } from '../../classes/event/event';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl: string = "http://localhost/eventum/Eventum_Angular/php/search";

  constructor(private httpClient: HttpClient) { }

  public getSearchedUsers(text: string) {
    return this.httpClient.get<User[]>(this.baseUrl + '/search_user.php?text=' + text).pipe(map(users => {
      console.log(users);
      return users;
    }));
  }

  public getSearchedEvents(text: string, type: string) {
    return this.httpClient.get<Event[]>(this.baseUrl + '/search_events.php?recherche=' + text + '&type=' + type).pipe(map(events => {
      console.log(events);
      return events;
    }));
  }


}
