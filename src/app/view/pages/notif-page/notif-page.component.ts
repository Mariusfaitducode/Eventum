import { Component } from '@angular/core';
import { Notif } from 'src/app/model/classes/notif/notif';
import { User } from 'src/app/model/classes/user/user';
import { AuthentificationService } from 'src/app/model/services/authentification/authentification.service';
import { EventService } from 'src/app/model/services/event/event.service';
import { MessagerieService } from 'src/app/model/services/messagerie/messagerie.service';
import { NotifService } from 'src/app/model/services/notif/notif.service';
import { UserService } from 'src/app/model/services/user/user.service';

@Component({
  selector: 'app-notif-page',
  templateUrl: './notif-page.component.html',
  styleUrls: ['./notif-page.component.css']
})
export class NotifPageComponent {

  user!: User;
  notifs: Notif[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthentificationService,
    private notifService: NotifService,
    private eventService: EventService,
    private messageService: MessagerieService,
    ) {}

  ngOnInit(): void {

    const loggedIn: boolean = this.authService.isLoggedIn();



    if (loggedIn) {

      // Get the user information
      this.userService.getUserByToken().subscribe((data: User) => {
        console.log(data);
        this.user = data;

        this.notifService.getUserNotifs(this.user.id_utilisateur).subscribe((data: Notif[]) => {
          console.log(data);

          for (let notif of data) {

            notif.date_notif = new Date(notif.date_notif);



            const difference = new Date().getTime() - notif.date_notif.getTime();

            notif.duration = this.determineDuration(difference);

            console.log(notif.duration);

            this.notifs.push(notif);

            // 'notif_mp','notif_mpg','notif_friend','notif_event','notif_event_participant'

            switch (notif.type_notif) {
              case "notif_mp":

                this.notifService.getNotifMp(notif.id_notif).subscribe((data: any) => {

                  // Retourne id message
                  console.log(data.id_utilisateur_envoyeur);

                  this.userService.getUserById(data.id_utilisateur_envoyeur).subscribe((data: any) => {

                    console.log(data);
                    notif.content = data;
                  });
                });
                // notif.type_notif = "a aimé votre publication";
                break;
              case "notif_mpg":

                this.notifService.getNotifMpg(notif.id_notif).subscribe((data: any) => {

                  // Retourne id message
                  console.log(data.id_message);

                  // this.userService.getUserById(data.id_user).subscribe((data: any) => {

                  //   console.log(data);
                  //   notif.content = data;
                  // });
                });

                break;
              case "notif_friend":
                // notif.type_notif = "a aimé votre publication";

                this.notifService.getNotifFriend(notif.id_notif).subscribe((data: any) => {

                    // Retourne id user
                    console.log(data.id_user);

                    this.userService.getUserById(data.id_user).subscribe((data: any) => {

                      console.log(data);
                      notif.content = data;
                    });
                });

                break;

              case "notif_event":
                // notif.type_notif = "a aimé votre publication";

                this.notifService.getNotifChangeEvent(notif.id_notif).subscribe((data: any) => {

                  // Retourne id evenement
                  console.log(data.id_evenement);

                  this.eventService.getEventById(data.id_evenement).subscribe((data: any) => {

                    console.log(data);
                    notif.content = data;
                  });
                });
                break;

              case "notif_event_participant":
                // notif.type_notif = "a aimé votre publication";

                this.notifService.getNotifEventParticipate(notif.id_notif).subscribe((data: any) => {

                  // Retourne id evenement
                  console.log(data.id_evenement);

                  this.eventService.getEventById(data.id_evenement).subscribe((data: any) => {

                    console.log(data);
                    notif.content = data;
                  });
                });
                break;

              default:
                break;
            }

          }
        });
      });

    }
  }

  determineDuration(difference : number) {

    // Calculez les différences en jours, heures et minutes
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    // Déterminez le format à afficher en fonction de la durée
    let duration: string;

    if (days > 0) {
      duration = `${days} jour${days > 1 ? 's' : ''}`;
    } else if (difference < (1000 * 60 * 60)) {
      duration = `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      duration = `${hours} heure${hours > 1 ? 's' : ''}`;
    }

    return duration;
  }
}
