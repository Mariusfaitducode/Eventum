import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() link_img!: string
  @Input() name!: string
  @Input() id!: number
  @Input() link!: string;

  constructor() {
    
  }

}
