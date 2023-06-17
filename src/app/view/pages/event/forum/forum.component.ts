import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Event} from "../../../../model/classes/event/event";
import {User} from "../../../../model/classes/user/user";
import {EventService} from "../../../../model/services/event/event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../model/services/user/user.service";
import {AuthentificationService} from "../../../../model/services/authentification/authentification.service";
import {Message} from "../../../../model/classes/message/message";
import {MessagerieService} from "../../../../model/services/messagerie/messagerie.service";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, AfterViewChecked {
  @Input() event!: Event;
  @Input() connectedUser!: User;
  @Input() isRegistered!: boolean;

  @ViewChild('scrollMe') myScrollContainer!: ElementRef;

  public messages: Message[] = []
  public message!: string


  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthentificationService, private router: Router, private serviceEvent: EventService, private service: MessagerieService) {}

  ngOnInit(): void {
    if(localStorage.getItem('token') == null){ // L'utilisateur n'est pas connecté
      // redirection vers la page hub
      this.router.navigateByUrl('hub');
    }


    if (this.connectedUser != null && this.event != null) {
      // Get the messages
      this.service.getMessagesForEvent(this.event.id_evenement).subscribe((data: Message[]) => {
        console.log(data);
        this.messages = data;
      });
    }


    const loggedIn: boolean = this.authService.isLoggedIn();

    //if (loggedIn)
    if (loggedIn) {

      this.route.params.subscribe((params) => {
        // Get the ID of the user you're connected to
        var id = +params['id'];
        console.log("id event = " + id);

        if (id != null) {
          this.serviceEvent.getEventById(id).subscribe((data : Event) => {
            this.event = data;
          });
        }
      });
    }
  }

  sendMessage() {
    this.service.sendMessagesForEvent(this.connectedUser.id_utilisateur, this.event.id_evenement, this.message).subscribe((data: boolean) => {
      console.log(data);
    });
    this.message = "";
  }

  scrollToBottom() {
    console.log('scroll');
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
