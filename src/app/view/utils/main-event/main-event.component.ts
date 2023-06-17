import { Component, Input } from '@angular/core';
import { EventService } from 'src/app/model/services/event/event.service';
import { Event } from 'src/app/model/classes/event/event';
import { User } from 'src/app/model/classes/user/user';

@Component({
  selector: 'app-main-event',
  templateUrl: './main-event.component.html',
  styleUrls: ['./main-event.component.css']
})
export class MainEventComponent {
  @Input() event!: Event; 
  @Input() participantsNumber!: number; 

  
}
