import { Component, Input, ViewChild } from '@angular/core';
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


  @ViewChild('participate') participate: any;

  @ViewChild('create') create: any;

  displayParticipateEvent() {

    this.selectedEvents = this.event_participate;
    this.participate.nativeElement.classList.add('selected');
    this.create.nativeElement.classList.remove('selected');
  }

  displayCreateEvent() {

    this.selectedEvents = this.event_create;
    this.create.nativeElement.classList.add('selected');
    this.participate.nativeElement.classList.remove('selected');
  }

  
}
