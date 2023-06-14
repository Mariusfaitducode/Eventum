import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RightPaneComponent } from '../../right-pane/right-pane.component';
import { LeftPaneComponent } from '../../left-pane/left-pane.component';
import {User} from "../../../model/classes/user/user";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  public user_sender!: User;
  @Input() user_receiver!: User;

  constructor() {

  }

  ngOnInit(): void {

  }



}
