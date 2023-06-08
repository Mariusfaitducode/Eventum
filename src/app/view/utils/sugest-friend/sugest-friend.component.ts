import { Component } from '@angular/core';
import { User } from '../../../model/classes/user/user';
import { UserService } from '../../../model/services/user/user.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-sugest-friend',
  templateUrl: './sugest-friend.component.html',
  styleUrls: ['./sugest-friend.component.css']
})
export class SugestFriendComponent implements OnInit{
  public UserArray : User[] = [];
  constructor(private service : UserService) {
    console.log('UserService constructor called');
    this.service.getData().subscribe((data : User[]) => {
      this.UserArray = data;
    });
  }

  ngOnInit(): void {

  }

}
