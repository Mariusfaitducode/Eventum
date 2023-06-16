import { Component, Input } from '@angular/core';
import { Notif } from 'src/app/model/classes/notif/notif';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() notif!: Notif;
}
