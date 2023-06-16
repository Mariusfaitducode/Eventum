import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Notif } from '../../classes/notif/notif';

@Injectable({
  providedIn: 'root'
})
export class NotifService {
  baseUrl: string = "http://localhost/eventum/Eventum_Angular/php";

  constructor(private httpClient: HttpClient) { }

  public getUserNotifs(id_user: number) {
    return this.httpClient.get<Notif[]>(this.baseUrl + '/notifications/notifs.php?id_user=' + id_user).pipe(map(Notifs => {
      return Notifs;
    }));
  }

  public getNotifEventParticipate(id_notif: number) {
    return this.httpClient.get<Notif[]>(this.baseUrl + '/notifications/notif_event_participant.php?id_notif=' + id_notif).pipe(map(Notifs => {
      return Notifs;
    }));
  }

  public getNotifChangeEvent(id_notif: number) {
    return this.httpClient.get<Notif[]>(this.baseUrl + '/notifications/notif_change_event.php?id_notif=' + id_notif).pipe(map(Notifs => {
      return Notifs;
    }));
  }

  public getNotifFriend(id_notif: number) {
    return this.httpClient.get<Notif[]>(this.baseUrl + '/notifications/notif_friend.php?id_notif=' + id_notif).pipe(map(Notifs => {
      return Notifs;
    }));
  }

  public getNotifMp(id_notif: number) {
    return this.httpClient.get<Notif[]>(this.baseUrl + '/notifications/notif_mp.php?id_notif=' + id_notif).pipe(map(Notifs => {
      return Notifs;
    }));
  }

  public getNotifMpg(id_notif: number) {
    return this.httpClient.get<Notif[]>(this.baseUrl + '/notifications/notif_mpg.php?id_notif=' + id_notif).pipe(map(Notifs => {
      return Notifs;
    }));
  }

}
