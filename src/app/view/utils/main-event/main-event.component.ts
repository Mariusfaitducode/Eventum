import { Component } from '@angular/core';
import { EventService } from 'src/app/model/services/event/event.service';
import { Event } from 'src/app/model/classes/event/event';

@Component({
  selector: 'app-main-event',
  templateUrl: './main-event.component.html',
  styleUrls: ['./main-event.component.css']
})
export class MainEventComponent {
  public event!: Event;
  constructor(service: EventService) {
    service.getEventById(23).subscribe((data: Event) => {
      this.event = data;
      console.log(this.event);
    });
  }
}
