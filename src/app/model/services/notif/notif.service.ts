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

  public changeNotifToViewed(id_notif: number){
    return this.httpClient.get<boolean>(this.baseUrl + '/notifications/update_notifs.php?id_notif=' + id_notif).pipe(map(is_correct => {
      return is_correct;
    }));
  }

  public changeMessageNotifToViewed(id_user: number, id_message_user: number){
    return this.httpClient.get<boolean>(this.baseUrl + '/notifications/update_notifs.php?id_message_user=' + id_message_user + '&user='+ id_user).pipe(map(is_correct => {
      return is_correct;
    }));
  }

  public changeFriendNotifToViewed(id_user: number, id_friend_user: number){
    return this.httpClient.get<boolean>(this.baseUrl + '/notifications/update_notifs.php?id_friend_user=' + id_friend_user + '&user='+ id_user).pipe(map(is_correct => {
      return is_correct;
    }));
  }

  public changeEventNotifToViewed(id_user: number, id_event: number){
    return this.httpClient.get<boolean>(this.baseUrl + '/notifications/update_notifs.php?id_event=' + id_event + '&user='+ id_user).pipe(map(is_correct => {
      return is_correct;
    }));
  }


}
