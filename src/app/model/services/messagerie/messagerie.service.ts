import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../../classes/user/user";
import {Message} from "../../classes/message/message";

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  baseUrl: string = "http://localhost/eventum/Eventum_Angular/php/messagerie";

  constructor(private httpClient: HttpClient) { }

  public sendMessage(id_sender: number, id_receiver: number, message: string, id_event:number) {

    return this.httpClient.get<boolean>(this.baseUrl + '/send_message.php?id_sender=' + id_sender + '&id_receiver=' + id_receiver + '&message=' + message + '&id_event=' + id_event).pipe(map(is_correct => {
      return is_correct;
    }));
  }

  public getListConversation(id_user: number) {
    return this.httpClient.get<User[]>(this.baseUrl + '/liste_conversation.php?id_utilisateur=' + id_user).pipe(map(Conversations => {
      return Conversations;
    }));
  }

  public getMessages(id_sender: number, id_receiver: number) {
    return this.httpClient.get<Message[]>(this.baseUrl + '/load_messages.php?id_sender=' + id_sender + '&id_receiver=' + id_receiver).pipe(map(messages => {
      return messages;
    }));
  }

  // public getMessageById(id_message: number) {
  //   return this.httpClient.get<Message[]>(this.baseUrl + '/load_message_by_id.php?id_message=' + id_message).pipe(map(messages => {
  //     return messages;
  //   }));
  // }
}
