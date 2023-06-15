import { Component, Input } from '@angular/core';
import { Event } from 'src/app/model/classes/event/event';
import { EventService } from 'src/app/model/services/event/event.service';

@Component({
  selector: 'app-container-event',
  templateUrl: './container-event.component.html',
  styleUrls: ['./container-event.component.css']
})
export class ContainerEventComponent {
  @Input() events : Event[] = [];


  constructor(service: EventService) {
    
  }

}
