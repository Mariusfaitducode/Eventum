import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../../classes/user/user";

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  baseUrl: string = "http://localhost/eventum/Eventum_Angular/php/messagerie";

  constructor(private httpClient: HttpClient) { }

  public sendMessage(id_sender: number, id_receiver: number, message: string) {

    return this.httpClient.get<boolean>(this.baseUrl + '/send_message.php?id_sender=' + id_sender + '&id_receiver=' + id_receiver + '&message=' + message).pipe(map(is_correct => {
      return is_correct;
    }));
  }

  public getListConversation(id_user: number) {
    return this.httpClient.get<User[]>(this.baseUrl + '/liste_conversation.php?id_utilisateur=' + id_user).pipe(map(Conversations => {
      return Conversations;
    }));
  }
}
