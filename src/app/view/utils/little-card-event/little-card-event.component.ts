import { Component, Input } from '@angular/core';
import { Event } from 'src/app/model/classes/event/event';

@Component({
  selector: 'app-little-card-event',
  templateUrl: './little-card-event.component.html',
  styleUrls: ['./little-card-event.component.css']
})
export class LittleCardEventComponent {

  @Input()  event!: Event;
  @Input()  id!: number;
  constructor() { }
}
