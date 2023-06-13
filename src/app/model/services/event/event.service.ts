import { Injectable, Output, EventEmitter } from '@angular/core'
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Event } from '../../classes/event/event'
import { Categorie } from '../../classes/categorie/categorie';

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

  public addEvent(title: string, description: string, date: Date, heure: string, lieu: string, is_public: boolean, id_categorie: number, id_createur: number, image: string) {

    return this.httpClient.get<boolean>(this.baseUrl + '/add_event.php?titre=' + title + '&description=' + description + '&date=' + date + '&heure=' + heure + '&lieu=' + lieu + '&is_public=' + is_public + '&id_categorie=' + id_categorie + '&id_createur=' + id_createur + '&image=' + image).pipe(map(is_correct => {
      return is_correct;
    }));
  }

  // Retourne une liste de catégories
  public getCategories() {
    return this.httpClient.get<Categorie[]>(this.baseUrl + '/categorie.php').pipe(map(Categories => {
        return Categories;
    }));
  }
  

}


