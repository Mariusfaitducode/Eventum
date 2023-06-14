import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../../../model/classes/message/message";

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.css']
})
export class SingleMessageComponent implements OnInit{
  @Input() message!: Message;
  @Input() id_user!: number;

  ngOnInit() {
    console.log(this.message);
  }
}
