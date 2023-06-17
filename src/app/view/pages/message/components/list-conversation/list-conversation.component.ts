import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../model/classes/user/user";
import {MessagerieService} from "../../../../../model/services/messagerie/messagerie.service";
import {UserService} from "../../../../../model/services/user/user.service";
import {AuthentificationService} from "../../../../../model/services/authentification/authentification.service";
import { SearchService } from 'src/app/model/services/search/search.service';

@Component({
  selector: 'app-list-conversation',
  templateUrl: './list-conversation.component.html',
  styleUrls: ['./list-conversation.component.css']
})
export class ListConversationComponent implements OnInit {
  public UserArray : User[] = [];
  public link: string = "messages";
  public text: string = "";
  public searchedUsers: User[] = [];

  constructor(
    private service: MessagerieService, 
    private userService: UserService, 
    private authService: AuthentificationService,
    private searchService: SearchService) {}

  ngOnInit(): void {

    const loggedIn: boolean = this.authService.isLoggedIn();

    //if (loggedIn)
    if (loggedIn) {

      // Get the user information
      this.userService.getUserByToken().subscribe((data: User) => {
        console.log(data);
        this.getListConversationOfUser(data.id_utilisateur);
      });
    }
  }

  getListConversationOfUser(id: number): void {
    this.service.getListConversation(id).subscribe((data2: User[]) => {
      console.log("data"+data2);
      this.UserArray = data2;
    })
  }

  searchUsers(): void {
    if (this.text == "") {
      this.userService.getUserByToken().subscribe((data: User) => {
        console.log(data);
        this.getListConversationOfUser(data.id_utilisateur);
      });
    } else {
      this.searchService.getSearchedUsers(this.text).subscribe((data: User[]) => {
        this.UserArray = [];
        this.UserArray = data;
      })
    }

  }

  public setTextToEmpty() {
    this.text = "";
    this.searchUsers();
  }
}
