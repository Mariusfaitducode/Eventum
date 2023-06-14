import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { RightPaneComponent } from '../../right-pane/right-pane.component';
import { LeftPaneComponent } from '../../left-pane/left-pane.component';
import {User} from "../../../model/classes/user/user";
import {UserService} from "../../../model/services/user/user.service";
import {AuthentificationService} from "../../../model/services/authentification/authentification.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{
  public user_sender!: User;
  public user_receiver!: User;

  constructor(private route: ActivatedRoute, private userService: UserService, private authService: AuthentificationService) {}

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
          this.getUserById(id);
        }

      });

      // Get the user information
      this.userService.getUserByToken().subscribe((data: User) => {
        console.log(data);
        this.user_sender = data;
      });
    }
  }

  getUserById(id: number): void {
    this.userService.getUserById(id).subscribe((data: User) => {
      console.log(data);
      this.user_receiver = data;
      console.log("Now connected to " + data.pseudo);
    });
  }

}
