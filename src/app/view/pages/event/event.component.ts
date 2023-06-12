import { Component } from '@angular/core';
import { Event } from '../../../model/classes/event/event';

import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/model/services/event/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  event!: Event; 

  constructor(
    private route: ActivatedRoute,
    private service: EventService) {}

  ngOnInit() {

    this.route.params.subscribe((params) => {
      const id = +params['id'];
      console.log(id); // Check if the id is correct

      this.service.getEventById(id).subscribe((event) => {
      

        console.log("event ="+event); // Check if the user object is retrieved correctly
        this.event = event;
      });
    });

  }
}
