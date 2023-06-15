import { Component } from '@angular/core';
import { User } from 'src/app/model/classes/user/user';
import { AuthentificationService } from 'src/app/model/services/authentification/authentification.service';
import { UserService } from 'src/app/model/services/user/user.service';

@Component({
  selector: 'app-notif-page',
  templateUrl: './notif-page.component.html',
  styleUrls: ['./notif-page.component.css']
})
export class NotifPageComponent {

  user!: User;

  constructor( private userService: UserService, private authService: AuthentificationService) {}

  ngOnInit(): void {

    const loggedIn: boolean = this.authService.isLoggedIn();

    

    if (loggedIn) {

      // Get the user information
      this.userService.getUserByToken().subscribe((data: User) => {
        console.log(data);
        this.user = data;
      });
    
    }
  }
}
