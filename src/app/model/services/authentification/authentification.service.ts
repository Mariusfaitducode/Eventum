import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private loggedInStatus = true;

  redirectUrl!: string;
  baseUrl: string = "http://localhost/eventum/Eventum_Angular/php";

  constructor(private httpClient: HttpClient) {
    this.loggedInStatus = this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    // Vérifier si le token d'authentification existe dans le localStorage ou les cookies
    // et renvoyer true ou false en conséquence
    // Par exemple :
    const token = localStorage.getItem('token');
    return !!token; // Renvoie true si le token existe, sinon false
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  // Fonction appelé à l'authentification
  public login(email: string, password : string) {
    return this.httpClient.get<Boolean>(this.baseUrl + '/login.php?email=' + email + '&password=' + password).pipe(map(Boolean => {
      return Boolean;
  }));
  }

  // Fonction appelé à l'inscription
  public register(nom: string, prenom: string, pseudo: string, email: string, password: string) {
    return this.httpClient.get<Boolean>(this.baseUrl + '/register.php?nom=' + nom + '&prenom=' + prenom + '&pseudo=' + pseudo + '&email=' + email + '&password=' + password).pipe(map(Boolean => {
      return Boolean;
  }));
  }

  

}
