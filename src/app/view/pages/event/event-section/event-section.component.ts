import { Component, Input } from '@angular/core';
import { Event } from 'src/app/model/classes/event/event';

@Component({
  selector: 'app-event-section',
  templateUrl: './event-section.component.html',
  styleUrls: ['./event-section.component.css']
})
export class EventSectionComponent {
  @Input() event!: Event;

  constructor() { }
}
