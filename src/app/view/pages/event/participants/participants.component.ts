import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/model/services/event/event.service';
import { User } from 'src/app/model/classes/user/user';
import { UserService } from 'src/app/model/services/user/user.service';
import { Event } from 'src/app/model/classes/event/event';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent {

  event!: Event; 

  creatorEvent!: User;
  connectedUser!: User;

  participants!: User[];

  isRegistered: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService) {}
    
  ngOnInit() {

    this.route.params.subscribe((params) => {
      const id = +params['id'];
      console.log(id); // Check if the id is correct

      this.eventService.getEventById(id).subscribe((event) => {
      

        console.log("event ="+event); // Check if the user object is retrieved correctly
        this.event = event;

        this.eventService.getParticipantsByEvent(this.event.id_evenement).subscribe((participants) => {
          console.log(participants); // Check if the user object is retrieved correctly
          this.participants = participants;
        });

        this.userService.getUserById(this.event.id_createur).subscribe((creatorEvent) => {
          console.log("creatorEvent ="+creatorEvent); // Check if the user object is retrieved correctly
          this.creatorEvent = creatorEvent;
        });

        this.userService.getUserByToken().subscribe((user) => {

          console.log("user ="+user); // Check if the user object is retrieved correctly
          this.connectedUser = user;
  
          this.userService.isUserInEvent(this.connectedUser.id_utilisateur, this.event.id_evenement).subscribe((isRegistered) => {
  
            console.log("isRegistered ="+isRegistered); // Check if the user object is retrieved correctly
            this.isRegistered = isRegistered;
          
          });
        });
      });
    });
  }

}
