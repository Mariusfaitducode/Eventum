import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../../classes/user/user";
import {Message} from "../../classes/message/message";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {
  baseUrl: string = "http://localhost/eventum/Eventum_Angular/php/messagerie";
  private messageSource = new BehaviorSubject<string>('');
  message$ = this.messageSource.asObservable();

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

  sendMessageObservable(message: string) {
    this.messageSource.next(message);
  }

  public getSearchedUsers(text: string) {
    return this.httpClient.get<User[]>(this.baseUrl + '/search_user.php?text=' + text).pipe(map(users => {
      console.log(users);
      return users;
    }));
  }
}
