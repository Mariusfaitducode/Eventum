import { Component } from '@angular/core';
import { User } from '../../../model/classes/user/user';
import { UserService } from '../../../model/services/user/user.service';
import { OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-sugest-friend',
  templateUrl: './sugest-friend.component.html',
  styleUrls: ['./sugest-friend.component.css']
})
export class SugestFriendComponent implements OnInit{
  public UserArray : User[] = [];
  constructor(private service : UserService, private apiService: ApiService) {
    this.apiService.getUsers().subscribe((data: User[]) => {
      console.log(data);
      this.UserArray = data;
    });
  }

  ngOnInit(): void {

  }

}
