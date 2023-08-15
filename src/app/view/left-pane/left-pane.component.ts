import { Component } from '@angular/core';
import { Notif } from 'src/app/model/classes/notif/notif';
import { User } from 'src/app/model/classes/user/user';
import { AuthentificationService } from 'src/app/model/services/authentification/authentification.service';
import { EventService } from 'src/app/model/services/event/event.service';
import { MessagerieService } from 'src/app/model/services/messagerie/messagerie.service';
import { NotifService } from 'src/app/model/services/notif/notif.service';
import { UserService } from 'src/app/model/services/user/user.service';
import { Router } from '@angular/router';
import { distinct } from 'rxjs';

@Component({
  selector: 'app-left-pane',
  templateUrl: './left-pane.component.html',
  styleUrls: ['./left-pane.component.css']
})
export class LeftPaneComponent {

  user!: User;
  notifs: Notif[] = [];

  pastille: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthentificationService,
    private notifService: NotifService,
    private eventService: EventService,
    private messageService: MessagerieService,
    private router: Router
    ) {}

  ngOnInit(): void {
    if(localStorage.getItem('token') == null){ // L'utilisateur n'est pas connecté
      // redirection vers la page hub
      this.router.navigateByUrl('hub');
    }

    const loggedIn: boolean = this.authService.isLoggedIn();



    if (loggedIn) {

      // Get the user information
      this.userService.getUserByToken().subscribe((data: User) => {
        console.log(data);
        this.user = data;

        this.notifService.getUserNotifs(this.user.id_utilisateur).subscribe((data: Notif[]) => {
          console.log(data);

          for (let notif of data) {

            this.notifs.push(notif);

            if (notif.vue == false) {
              console.log("pastilleeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
              console.log(notif);
              this.pastille = true;
            }

            // 'notif_mp','notif_mpg','notif_friend','notif_event','notif_event_participant'

            //Récupère contenu notif en fonction du type

            
            

          }
        });

        // this.notifs = this.notifs.pipe(distinct((notification: Notification) => notification.id));
        
      });
    }
  
  }

}
