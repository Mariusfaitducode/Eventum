import { Component, Input } from '@angular/core';
import { Event } from 'src/app/model/classes/event/event';

@Component({
  selector: 'app-profil-content',
  templateUrl: './profil-content.component.html',
  styleUrls: ['./profil-content.component.css']
})
export class ProfilContentComponent {

  @Input() event_participate!: Event[];
  @Input() event_create!: Event[];

  selectedEvents!: Event[];

  participate_event: boolean = true;
  create_event: boolean = false;

  displayParticipateEvent() {

    this.selectedEvents = this.event_participate;
    this.participate_event = true;
    this.create_event = false;
  }

  displayCreateEvent() {

    this.selectedEvents = this.event_create;
    this.participate_event = false;
    this.create_event = true;
  }

  
}
