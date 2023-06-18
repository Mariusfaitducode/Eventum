import { Injectable, Output, EventEmitter } from '@angular/core'
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { User } from '../../classes/user/user'
import { Relation } from '../../classes/relation/relation'
import { Notif } from '../../classes/notif/notif';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  //redirectUrl!: string;
  baseUrl: string = "http://localhost/eventum/Eventum_Angular/php";
  baseUrl2: string = "http://localhost/eventum/Eventum_Angular/php/forum";

  constructor(private httpClient: HttpClient, private router: Router) { }

  public getUsers() {
    return this.httpClient.get<User[]>(this.baseUrl + '/utilisateur.php').pipe(map(Users => {
        return Users;
    }));
  }


  public getUserById(id: number) {
      return this.httpClient.get<User>(this.baseUrl + '/utilisateur.php?id=' + id).pipe(map(User => {
          return User;
      }));
  }

  public getUserByToken() {
    const token = localStorage.getItem('token');
    console.log("token ="+token); // Check if the user object is retrieved correctly
    return this.httpClient.get<User>(this.baseUrl + '/utilisateur.php?token=' + token).pipe(map(User => {
        console.log("ezfezfezfezfzef" + User);
        if(User.id_utilisateur == null){
          // redirection vers la page hub
          this.router.navigateByUrl('hub');
        }
        return User;
    }));
  }

  public getRelation(id_1: number, id_2: number) {
      return this.httpClient.get<Relation>(this.baseUrl + '/relation/relation.php?id_suiveur=' + id_1 + '&id_suivie=' + id_2).pipe(map(Relation => {
          return Relation;
      }));
  }

  public isUserInEvent(id_user: number, id_event: number) {
    return this.httpClient.get<boolean>(this.baseUrl + '/user/is_user_in_event.php?id_user=' + id_user + '&id_event=' + id_event).pipe(map(Boolean => {
        return Boolean;
    }));
  }


  public follow(id_suiveur: number, id_suivi: number) {
    return this.httpClient.get<boolean>(this.baseUrl + '/relation/suivre.php?id_suiveur=' + id_suiveur + '&id_suivie=' + id_suivi);
  }

  public unfollow(id_suiveur: number, id_suivi: number) {
    return this.httpClient.get<boolean>(this.baseUrl + '/relation/ne_plus_suivre.php?id_suiveur=' + id_suiveur + '&id_suivie=' + id_suivi);
  }

  public modifyUser(nom:string, prenom:string, email:string, pseudo:string, password:string){
    // récupérer l'utilisateur connecté
    const token = localStorage.getItem('token');

    return this.httpClient.get<any>(this.baseUrl + '/user/modify_profil.php?token='+ token + '&nom=' + nom + '&prenom=' + prenom + '&email=' + email + '&pseudo=' + pseudo + '&password=' + password).pipe(map(any => {
      return any;
    }));
  }

  // Récupérer les followers d'un utilisateur
  public getFollowings(id_user: number) {
    return this.httpClient.get<User[]>(this.baseUrl + '/user/liste_suivie.php?id_utilisateur=' + id_user).pipe(map(Users => {
        return Users;
    }));
  }

  // Récupérer les followings d'un utilisateur
  public getFollowers(id_user: number) {
    return this.httpClient.get<User[]>(this.baseUrl + '/user/liste_suiveur.php?id_utilisateur=' + id_user).pipe(map(Users => {
        return Users;
    }));
  }

  public getRecommendedUsers(id_user: number) {
    return this.httpClient.get<User[]>(this.baseUrl + '/user/liste_reco.php?id_utilisateur=' + id_user).pipe(map(Users => {
        return Users;
    }));
  }

  public getUserByIdEvent(id_event: number) {
    return this.httpClient.get<User[]>(this.baseUrl2 + '/users_in_event.php?id_evenement=' + id_event).pipe(map(Users => {
      return Users;
    }));
  }

  public isPasswordCorrect(id_user: number, password: string){
    return this.httpClient.get<Boolean>(this.baseUrl + '/user/is_password_correct.php?id_user=' + id_user + '&password=' + password).pipe(map(Boolean => {
      return Boolean;
    }));
  }

}


