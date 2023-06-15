import { Component, Input } from '@angular/core';
import { EventService } from 'src/app/model/services/event/event.service';
import { Event } from 'src/app/model/classes/event/event';

@Component({
  selector: 'app-main-event',
  templateUrl: './main-event.component.html',
  styleUrls: ['./main-event.component.css']
})
export class MainEventComponent {
  @Input() event!: Event; // Assurez-vous d'importer le modèle Event depuis votre API ou de le définir correctement

  constructor(service: EventService) {
    
  }
}
