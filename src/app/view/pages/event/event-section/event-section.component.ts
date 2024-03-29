import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/classes/event/event';
import { User } from 'src/app/model/classes/user/user';
import { EventService } from 'src/app/model/services/event/event.service';
import { NavigationExtras } from '@angular/router';
import { ShareDataService } from 'src/app/model/services/share/share-data.service';

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



  constructor( private eventService: EventService, private router: Router, private shareService: ShareDataService) { }

  registerToEvent() {

    console.log("registerToEvent")
    this.eventService.registerToEvent(this.connectedUser.id_utilisateur, this.event.id_evenement).subscribe((isRegistered) => {
      this.isRegistered = isRegistered;
    });
    this.eventService.registerToEventObservable("message");
    this.shareService.setSuccessRegisterEvent();
  }

  unregisterToEvent() {
    this.eventService.unregisterToEvent(this.connectedUser.id_utilisateur, this.event.id_evenement).subscribe((result) => {
      this.isRegistered = !result;
    });
    this.eventService.removeToEventObservable("message");
    this.shareService.setSuccessRegisterEvent();
  }

  modifier(){
    const navigationExtras: NavigationExtras = {
      queryParams: { 'id': this.event.id_evenement }
    };
    this.router.navigate(['/event/'+ this.event.id_evenement + '/modifier'], navigationExtras);
  }
}

