import {Component, OnInit} from '@angular/core';
import {User} from "../../../../../model/classes/user/user";
import {MessagerieService} from "../../../../../model/services/messagerie/messagerie.service";
import {UserService} from "../../../../../model/services/user/user.service";

@Component({
  selector: 'app-list-conversation',
  templateUrl: './list-conversation.component.html',
  styleUrls: ['./list-conversation.component.css']
})
export class ListConversationComponent implements OnInit {
  public UserArray : User[] = [];
  public link: string = "messages";
  public id_user!: number;

  constructor(private service: MessagerieService, private userService: UserService) {
    this.userService.getUserByToken().subscribe((data: any) => {
      console.log(data);
      this.id_user = data.id_utilisateur;
    });
  }

  ngOnInit(): void {
    this.service.getListConversation(this.id_user).subscribe((data: User[]) => {
      console.log("data"+data);
      this.UserArray = data;
    })
  }



}
