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


    switch (this.notif.type_notif) {
      case "notif_mp":

        this.notifService.changeMessageNotifToViewed(this.notif.id_utilisateur, this.notif.content.id_utilisateur).subscribe({});

        break;
        


      // case "notif_mpg":

      //   break;
        
      case "notif_friend":

        this.notifService.changeFriendNotifToViewed(this.notif.id_utilisateur, this.notif.content.id_utilisateur).subscribe({});
        break; 

      case "notif_change_event":

        this.notifService.changeEventNotifToViewed(this.notif.id_utilisateur, this.notif.content.id_evenement).subscribe({});

        break;

       

      // case "notif_event_participant":


      //   break;

      default:
        this.notifService.changeNotifToViewed(this.notif.id_notif).subscribe({});
        break;
        
    }

    // if (this.notif.vue == false){

    //   // console.log("VIEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
    //   // console.log("view == 1 ?")
    //   // console.log(this.notif)

      
    //   this.notifService.changeNotifToViewed(this.notif.id_notif).subscribe({

    //   });
    // }

  }
}



