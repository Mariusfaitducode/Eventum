import { Component, OnInit } from '@angular/core';
import { Event } from '../../../model/classes/event/event';

import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/model/services/event/event.service';
import { User } from 'src/app/model/classes/user/user';
import { UserService } from 'src/app/model/services/user/user.service';
import { ShareDataService } from 'src/app/model/services/share/share-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{
  event!: Event;
  connectedUser!: User;
  numberParticipants: number = 0;

  isRegistered: boolean = false;

  successSubscription!: Subscription;
  success: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService,
    private router: Router,
    public shareService: ShareDataService
    ) {
      
    }


  ngOnInit() {
    this.eventModify();
    this.successSubscription = this.shareService.success$.subscribe(
      (success : boolean) => {
        this.eventModify();
      }
    );
    
  }

  eventModify() {
    if(localStorage.getItem('token') == null){ // L'utilisateur n'est pas connecté
      // redirection vers la page hub
      this.router.navigateByUrl('hub');
    }

    this.route.params.subscribe((params) => {
      const id = +params['id'];
      console.log(id); // Check if the id is correct

      this.eventService.getParticipantsByEvent(id).subscribe((participants) => {
        console.log(participants); // Check if the user object is retrieved correctly
        this.numberParticipants = participants.length;

        
      });

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

  ngOnDestroy(): void {
    this.successSubscription.unsubscribe();
  }
}
