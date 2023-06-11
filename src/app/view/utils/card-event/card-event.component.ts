import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.css']
})

export class CardEventComponent {
  @Input() id_createur!: number
  @Input()  titre!: string
  @Input()  id_categorie!: number
  @Input()  description!: string
  @Input()  image!: string
  @Input()  date!: Date
  @Input()  heure!: string
  @Input()  lieu!: string
  constructor() { }
}
