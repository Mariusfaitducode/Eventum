import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../model/classes/user/user";
import {MessagerieService} from "../../../../../model/services/messagerie/messagerie.service";
import {UserService} from "../../../../../model/services/user/user.service";
import {AuthentificationService} from "../../../../../model/services/authentification/authentification.service";
import {ActivatedRoute} from "@angular/router";
import {Message} from "../../../../../model/classes/message/message";

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css']
})
export class ListMessageComponent implements OnInit {
  public id_sender!: number
  public id_receiver!: number
  public messages: Message[] = []
  constructor(private service: MessagerieService, private userService: UserService, private authService: AuthentificationService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    if (this.id_sender!= null && this.id_receiver != null) {
      // Get the messages
      this.service.getMessages(this.id_sender, this.id_receiver).subscribe((data: Message[]) => {
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
        console.log("id =" + id);

        // Check if you're connected to someone
        if (!isNaN(id)) {

          // Get the information of the users you're connected to
          this.id_receiver = id;

          // Get the user information
          this.userService.getUserByToken().subscribe((data: User) => {
            console.log(data);
            this.id_sender = data.id_utilisateur;

            // Get the messages
            this.service.getMessages(this.id_sender, this.id_receiver).subscribe((data: Message[]) => {
              console.log(data);
              this.messages = data;
            });
          });
        }
      });
    }
  }
}
