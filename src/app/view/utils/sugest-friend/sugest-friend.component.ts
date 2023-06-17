import { Component } from '@angular/core';
import { User } from '../../../model/classes/user/user';

import { OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/model/services/user/user.service';
import { AuthentificationService } from 'src/app/model/services/authentification/authentification.service';

@Component({
  selector: 'app-sugest-friend',
  templateUrl: './sugest-friend.component.html',
  styleUrls: ['./sugest-friend.component.css']
})
export class SugestFriendComponent implements OnInit{
  public connectedUser!: User;
  public UserArray : User[] = [];
  public link: string = "profil";

  constructor(
    private service: UserService,
    ) {}

  ngOnInit(): void {

    this.service.getUserByToken().subscribe((data: User) => {
      this.connectedUser = data;

      this.service.getRecommendedUsers(this.connectedUser.id_utilisateur).subscribe((data: User[]) => {
        // const shuffledArray = data.sort(() => 0.5 - Math.random());
        // this.UserArray = shuffledArray.slice(0, 5);

        this.UserArray = data;
      });
    });

    

  }


}
