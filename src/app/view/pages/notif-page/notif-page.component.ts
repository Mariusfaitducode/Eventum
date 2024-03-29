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
  selector: 'app-notif-page',
  templateUrl: './notif-page.component.html',
  styleUrls: ['./notif-page.component.css']
})
export class NotifPageComponent {

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

            notif.duration = this.determineDuration(notif);

            console.log(notif.duration);

            this.notifs.push(notif);

            // 'notif_mp','notif_mpg','notif_friend','notif_event','notif_event_participant'

            //Récupère contenu notif en fonction du type

            switch (notif.type_notif) {
              case "notif_mp":

                this.notifService.getNotifMp(notif.id_notif).subscribe((data: any) => {

                  // Retourne id message
                  console.log(data.id_utilisateur_envoyeur);

                  this.userService.getUserById(data.id_utilisateur_envoyeur).subscribe((data: any) => {

                    console.log(data);
                    notif.content = data;

                    //this.notifs.push(notif);
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

                this.notifService.getNotifFriend(notif.id_notif).subscribe((data1: any) => {

                    // Retourne id user
                    console.log(data1.id_suiveur);


                    this.userService.getUserById(data1.id_suiveur).subscribe((data: any) => {

                      console.log("test")
                      console.log(data);
                      notif.content = data;

                      // this.notifs.push(notif);
                    });
                });

                break;

              case "notif_change_event":
                // notif.type_notif = "a aimé votre publication";

                this.notifService.getNotifChangeEvent(notif.id_notif).subscribe((data: any) => {

                  // Retourne id evenement
                  console.log(data.id_evenement);

                  this.eventService.getEventById(data.id_evenement).subscribe((data: any) => {

                    console.log(data);
                    notif.content = data;

                    //this.notifs.push(notif);
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

                    //this.notifs.push(notif);
                  });
                });
                break;

              default:
                break;
            }

          }
        });

        // this.notifs = this.notifs.pipe(distinct((notification: Notification) => notification.id));
        
      });
    }
  
  }

  // fonction pour déterminer si on doit afficher ou non la notif

  showNotif(notif: Notif): boolean {

    if (notif.content == null) {
      return false;
    }
    switch (notif.type_notif) {
      case "notif_mp":

        var count: number = 0;

        for (let not of this.notifs){

          //Bien un message
          if (not.content != null && not.type_notif == "notif_mp"){

            //Bien le bon correspondant
            if(notif.content.id_utilisateur == not.content.id_utilisateur ){

              if (not.vue == false){
                count++;
              }

              if (notif.date_notif < not.date_notif){
                return false;
              }
            }
          }
        }

        if (count > 0){
          notif.count = count;
          
          return true;
        }
        else{
          return false;
        }


      case "notif_mpg":
        return true;
      case "notif_friend":
        for (let not of this.notifs){

          //Bien notif "relation" et même utilisateur
          if (not.content != null && not.type_notif == "notif_friend"){
            if(notif.content.id_utilisateur == not.content.id_utilisateur ){

              if (this.notifs.indexOf(not) < this.notifs.indexOf(notif)){
                return false;
              }
              else{
                
                return true;
              }
            }
          }
        }
        return true;

      case "notif_change_event":

        for (let not of this.notifs){

          if (not.content != null && not.type_notif == "notif_change_event"){
            if(notif.content.id_evenement == not.content.id_evenement ){

              if (this.notifs.indexOf(not) < this.notifs.indexOf(notif)){
                return false;
              }
              else{
                return true;
              }
            }
          }
        }
        return true;

      case "notif_event_participant":
        return true;
      default:
        return true;
    }
  }


  determineDuration(notif : Notif) {

    notif.date_notif = new Date(notif.date_notif);
    const difference = new Date().getTime() - notif.date_notif.getTime();

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

  // adaptPastille(notif: Notif){

  //   if (this.pastille == false){
  //     this.pastille = !notif.vue;
  //   }
  // }
}
