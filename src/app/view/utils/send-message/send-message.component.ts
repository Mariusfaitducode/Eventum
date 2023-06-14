import { Component } from '@angular/core';
import {MessagerieService} from "../../../model/services/messagerie/messagerie.service";
import {UserService} from "../../../model/services/user/user.service";

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent {
  public id_sender: number = 0
  public id_receiver: number = 0
  public message: string = ""
  public image: string = ""
  public id_event: number = 0

  constructor(private service: MessagerieService, private userService: UserService) {
    this.userService.getUserByToken().subscribe((data: any) => {
      console.log(data);
      this.id_sender = data.id_utilisateur;
    });
  }

  OnConfirm(): void {
    console.log(this.id_sender);
    console.log(this.id_receiver);
    console.log(this.message);
    this.service.sendMessage(this.id_sender, this.id_receiver, this.message).subscribe((data: boolean) => {
      console.log(data);
    });
  }
}
