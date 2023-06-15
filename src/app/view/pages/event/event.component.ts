import { Component } from '@angular/core';
import { Event } from '../../../model/classes/event/event';

import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/model/services/event/event.service';
import { User } from 'src/app/model/classes/user/user';
import { UserService } from 'src/app/model/services/user/user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  event!: Event; 
  connectedUser!: User;

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
