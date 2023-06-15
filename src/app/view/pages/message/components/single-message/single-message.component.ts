import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../../../model/classes/message/message";
import {Event} from "../../../../../model/classes/event/event";
import {EventService} from "../../../../../model/services/event/event.service";

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.css']
})
export class SingleMessageComponent implements OnInit{
  @Input() message!: Message;
  @Input() id_user!: number;
  public event!: Event

  constructor(private eventService: EventService) {
  }

  ngOnInit() {

    if (this.message.id_evenement != null) {
      console.log("Il y a : " + this.message.id_evenement);
      this.eventService.getEventById(this.message.id_evenement).subscribe((event) => {
        this.event = event;
      });
    }
  }
}
