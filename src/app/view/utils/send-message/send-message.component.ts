import {Component, Input, OnInit} from '@angular/core';
import {MessagerieService} from "../../../model/services/messagerie/messagerie.service";
import {UserService} from "../../../model/services/user/user.service";
import {AuthentificationService} from "../../../model/services/authentification/authentification.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../model/classes/user/user";
import {EventService} from "../../../model/services/event/event.service";
import { Event } from '../../../model/classes/event/event'

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  public id_sender!: number
  public id_receiver!: number
  public message: string = ""
  public image: string = ""
  public id_event: number = 0
  showPopup: boolean = false
  public events!: Event[]

  constructor(private service: MessagerieService,
              private userService: UserService,
              private authService: AuthentificationService,
              private route: ActivatedRoute,
              private eventService: EventService) {}

  ngOnInit(): void {

    const loggedIn: boolean = this.authService.isLoggedIn();

    //if (loggedIn)
    if (loggedIn) {

      this.route.params.subscribe((params) => {

        // Get the ID of the user you're connected to
        var id = +params['id'];
        console.log("id =" + id);

        // Check if you're connected to someone
        if (!isNaN(id)) {

          // Get the information of the users you're connected to
          this.id_receiver = id;
        }

      });

      // Get the user information
      this.userService.getUserByToken().subscribe((data: User) => {
        console.log(data);
        this.id_sender = data.id_utilisateur;

        this.eventService.getEventsByUser(this.id_sender).subscribe((data: Event[]) => {
          console.log(data);
          this.events = data;
        });
      });
    }
  }

  OnConfirm(): void {
    console.log("id sender : " + this.id_sender + ", is receiver : " + this.id_receiver + ", message : '" + this.message + "', id event : " + this.id_event);
    this.service.sendMessage(this.id_sender, this.id_receiver, this.message, this.id_event).subscribe((data: boolean) => {
      console.log(data);
    });
    this.service.sendMessageObservable('message');
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  setIdEvent(idEvent: number) {
    console.log("Set ID event : "+ idEvent)
    this.id_event = idEvent;
    this.showPopup = false;
  }
}
