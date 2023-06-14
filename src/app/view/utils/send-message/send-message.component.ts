import {Component, Input, OnInit} from '@angular/core';
import {MessagerieService} from "../../../model/services/messagerie/messagerie.service";
import {UserService} from "../../../model/services/user/user.service";
import {AuthentificationService} from "../../../model/services/authentification/authentification.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../model/classes/user/user";

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

  constructor(private service: MessagerieService, private userService: UserService, private authService: AuthentificationService, private route: ActivatedRoute) {}

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
      });
    }
  }

  OnConfirm(): void {
    console.log("id sender : " + this.id_sender + ", is receiver : " + this.id_receiver + ", message : '" + this.message + "'");
    this.service.sendMessage(this.id_sender, this.id_receiver, this.message).subscribe((data: boolean) => {
      console.log(data);
    });
  }
}
