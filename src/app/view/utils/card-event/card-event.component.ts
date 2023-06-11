import { Component, Inject, Input } from '@angular/core';
import { Event } from 'src/app/model/classes/event/event';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.css']
})

export class CardEventComponent {
  
  @Input()  event!: Event;
  constructor() { }
}
