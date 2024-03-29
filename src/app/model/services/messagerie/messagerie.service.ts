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
  baseUrl2: string = "http://localhost/eventum/Eventum_Angular/php/forum";

  private messageSource = new BehaviorSubject<string>('');
  message$ = this.messageSource.asObservable();

  private forumSource = new BehaviorSubject<string>('');
  forum$ = this.messageSource.asObservable();

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

  sendForumObservable(message: string) {
    this.messageSource.next(message);
  }

  public getMessagesForEvent(id_event: number) {
    return this.httpClient.get<Message[]>(this.baseUrl2 + '/forum_load_message.php?id_evenement=' + id_event).pipe(map(messages => {
      return messages;
    }));
  }

  public sendMessagesForEvent(id_sender: number, id_event: number, message: string) {
    return this.httpClient.get<boolean>(this.baseUrl2 + '/forum_send_message.php?id_sender=' + id_sender + '&id_evenement=' + id_event + "&message=" + message).pipe(map(messages => {
      return messages;
    }));
  }

}
