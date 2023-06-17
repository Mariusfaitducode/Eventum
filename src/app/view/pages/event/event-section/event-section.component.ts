import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/classes/event/event';
import { User } from 'src/app/model/classes/user/user';
import { EventService } from 'src/app/model/services/event/event.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-event-section',
  templateUrl: './event-section.component.html',
  styleUrls: ['./event-section.component.css']
})
export class EventSectionComponent {
  @Input() event!: Event;
  @Input() connectedUser!: User;
  @Input() isRegistered!: boolean;
  @Input() numberParticipants!: number;

 

  constructor( private eventService: EventService, private router: Router) { }

  registerToEvent() {

    console.log("registerToEvent")
    this.eventService.registerToEvent(this.connectedUser.id_utilisateur, this.event.id_evenement).subscribe((isRegistered) => { 
      this.isRegistered = isRegistered;
    });
  }

  unregisterToEvent() {
    this.eventService.unregisterToEvent(this.connectedUser.id_utilisateur, this.event.id_evenement).subscribe((result) => {
      this.isRegistered = !result;
    });
  }

  modifier(){
    const navigationExtras: NavigationExtras = {
      queryParams: { 'id': this.event.id_evenement }
    };
    this.router.navigate(['/event/'+ this.event.id_evenement + '/modifier'], navigationExtras);
  }

  delete(){
    const navigationExtras: NavigationExtras = {
      queryParams: { 'id': this.event.id_evenement }
    };
    this.router.navigate(['/event/'+ this.event.id_evenement + '/confirmer'], navigationExtras);
  }
}

