import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private loggedInStatus = true;

  constructor() {
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
}
