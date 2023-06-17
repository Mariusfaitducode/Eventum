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
  categorieEvents_1: Event[] = [];
  categorieEvents_2: Event[] = [];
  categorieEvents_3: Event[] = [];
  connectedUser!: User;

  constructor(
    private eventService : EventService,
    private userService: UserService,
    private authService : AuthentificationService,
    private router : Router) { }

  ngOnInit(): void {

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

        this.eventService.getPreferredCategories(this.connectedUser.id_utilisateur).subscribe(categories => {
          
          
          this.eventService.getEventsByCategorie(this.connectedUser.id_utilisateur, categories[0]).subscribe(events => {
            this.categorieEvents_1 = events;
          });
          this.eventService.getEventsByCategorie(this.connectedUser.id_utilisateur, categories[1]).subscribe(events => {
            this.categorieEvents_2 = events;
          });
          this.eventService.getEventsByCategorie(this.connectedUser.id_utilisateur, categories[2]).subscribe(events => {
            this.categorieEvents_3 = events;
          });
          
        });


        


      });
    }else{
      // redirect to hub
      this.router.navigate(['/hub']);
    }
  }

}
