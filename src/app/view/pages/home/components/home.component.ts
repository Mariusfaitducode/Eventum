import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/model/classes/event/event';
import { User } from 'src/app/model/classes/user/user';
import { AuthentificationService } from 'src/app/model/services/authentification/authentification.service';
import { EventService } from 'src/app/model/services/event/event.service';
import { UserService } from 'src/app/model/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  recommendedEvents: Event[] = [];
  numberParticipants!: number;
  categorieEvents: Event[] = [];
  connectedUser!: User;

  constructor(
    private eventService : EventService,
    private userService: UserService,
    private authService : AuthentificationService,
    private router : Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') == null){ // L'utilisateur n'est pas connecté
      // redirection vers la page hub
      this.router.navigateByUrl('hub');
    }


    const loggedIn: boolean = this.authService.isLoggedIn();

    //if (loggedIn)
    if (loggedIn) {

      this.userService.getUserByToken().subscribe((user) => {

        this.connectedUser = user;

        console.log(user.id_utilisateur);

        this.eventService.getRecommendedEvents(this.connectedUser.id_utilisateur).subscribe(events => {
          this.recommendedEvents = events;

          
          this.eventService.getParticipantsByEvent(this.recommendedEvents[0].id_evenement).subscribe((participants) => {
      
            
            console.log(participants); // Check if the user object is retrieved correctly
            this.numberParticipants = participants.length;
          });
          
          
        });

        this.eventService.getEventsByCategorie(this.connectedUser.id_utilisateur, 20).subscribe(events => {
          this.categorieEvents = events;
        });


      });
    }
  }

}
