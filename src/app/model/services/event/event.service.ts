import { Injectable, Output, EventEmitter } from '@angular/core'
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Event } from '../../classes/event/event'
import { Categorie } from '../../classes/categorie/categorie';
import { User } from '../../classes/user/user';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  redirectUrl!: string;
  baseUrl: string = "http://localhost/eventum/Eventum_Angular/php";

  private messageSource = new BehaviorSubject<string>('');
  message$ = this.messageSource.asObservable();

  private messageSource2 = new BehaviorSubject<string>('');
  message2$ = this.messageSource2.asObservable();

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

  public addEvent(title: string, description: string, date: Date, heure: string, lieu: string, id_categorie: number, id_createur: number, max_participants: number) {
    return this.httpClient.get<any>(this.baseUrl + '/add_event.php?titre=' + title + '&description=' + description + '&date=' + date + '&heure=' + heure + '&lieu=' + lieu + '&id_categorie=' + id_categorie + '&id_createur=' + id_createur + '&max_participants=' + max_participants).pipe(map(is_correct => {
      return is_correct;
    }));
  }

  // Retourne une liste de catégories
  public getCategories() {
    return this.httpClient.get<Categorie[]>(this.baseUrl + '/categorie.php').pipe(map(Categories => {
        return Categories;
    }));
  }

  public getEventsByMonthAndUser(id: number, month: number, year: number) {
    return this.httpClient.get<Event[]>(this.baseUrl + '/event/event_month.php?id_user=' + id + '&month=' + month + '&year=' + year).pipe(map(Events => {

      Events.forEach(event => {
        event.date = new Date(event.date);
      });
      return Events;
    }));
  }

  public getEventsByUser(id: number) {
    return this.httpClient.get<Event[]>(this.baseUrl + '/event/event_by_user.php?id_user=' + id).pipe(map(Events => {

      return Events;
    }));
  }

  getRecommendedEvents(id: number) {
    return this.httpClient.get<Event[]>(this.baseUrl + '/event/event_reco.php?id_utilisateur=' + id).pipe(map(Events => {

      return Events;
    }));
  }

  getEventsByCategorie(id_user: number, id_categorie: number) {
    return this.httpClient.get<Event[]>
    (this.baseUrl + '/event/event_by_cat.php?id_utilisateur=' + id_user+'&id_categorie='+id_categorie).pipe(map(Events => {

      return Events;
    }));
  }

  public getParticipantsByEvent(id_event: number) {
    return this.httpClient.get<User[]>(this.baseUrl + '/event/liste_participant.php?id_evenement=' + id_event).pipe(map(Users => {
        return Users;
    }));
  }

  registerToEvent(id_user: number, id_event: number) {
    return this.httpClient.get<boolean>(this.baseUrl + '/event/inscription_event.php?id_utilisateur=' + id_user + '&id_evenement=' + id_event);
  }

  registerToEventObservable(message: string) {
    this.messageSource.next(message);
  }

  removeToEventObservable(message: string) {
    this.messageSource2.next(message);
  }

  unregisterToEvent(id_user: number, id_event: number) {
    return this.httpClient.get<boolean>(this.baseUrl + '/event/desinscription_event.php?id_utilisateur=' + id_user + '&id_evenement=' + id_event);
  }

  public modifyEvent(id_event: number, title: string, description: string, date: Date, heure: string, lieu: string, id_categorie: number, id_createur: number, max_participants: number) {

      return this.httpClient.get<boolean>(this.baseUrl + '/event/modify_event.php?id_evenement=' + id_event + '&titre=' + title + '&description=' + description + '&date=' + date + '&heure=' + heure + '&lieu=' + lieu + '&id_categorie=' + id_categorie + '&id_createur=' + id_createur + '&max_participants=' + max_participants).pipe(map(is_correct => {
        return is_correct;
      }));
    }

  // Supression d'un événement
  public deleteEvent(id_event: number) {
    return this.httpClient.get<boolean>(this.baseUrl + '/event/delete_event.php?id_evenement=' + id_event).pipe(map(is_correct => {
      return is_correct;
    }));
  }

  getPreferredCategories(id_user: number) {
    return this.httpClient.get<number[]>(this.baseUrl + '/event/cat_pref.php?id_utilisateur=' + id_user).pipe(map(Categories => {
      return Categories;
    }));
  }
}


