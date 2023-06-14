import { Component } from '@angular/core';
import { User } from '../../../model/classes/user/user';

import { OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/model/services/user/user.service';

@Component({
  selector: 'app-sugest-friend',
  templateUrl: './sugest-friend.component.html',
  styleUrls: ['./sugest-friend.component.css']
})
export class SugestFriendComponent implements OnInit{
  public UserArray : User[] = [];

  constructor(private service: UserService) {
    this.service.getUsers().subscribe((data: User[]) => {
      const shuffledArray = data.sort(() => 0.5 - Math.random());
      this.UserArray = shuffledArray.slice(0, 5);;
    });
  }

  ngOnInit(): void {

  }


}
