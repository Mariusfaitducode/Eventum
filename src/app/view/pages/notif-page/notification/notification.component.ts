import { Component, Input } from '@angular/core';
import { Notif } from 'src/app/model/classes/notif/notif';
import { NotifService } from 'src/app/model/services/notif/notif.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() notif!: Notif;

  constructor(
    private notifService: NotifService
    ) {}


  viewedNotif(){

    if (this.notif.vue == false){

      // console.log("VIEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
      // console.log("view == 1 ?")
      // console.log(this.notif)

      if (this.notif.type_notif == "notif_mp"){
        this.notifService.changeMessageNotifToViewed(this.notif.id_utilisateur, this.notif.content).subscribe({

        });
      }

      this.notifService.changeNotifToViewed(this.notif.id_notif).subscribe({

      });
    }

  }
}



