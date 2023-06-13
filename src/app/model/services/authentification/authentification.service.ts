import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//import * as crypto from 'crypto-browserify';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private loggedInStatus = true;
  private userId! : Number;
  //private secretKey = this.generateSecretKey();

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

    return this.httpClient.get<Number>(this.baseUrl + '/login.php?email=' + email + '&password=' + password).pipe(map(Number => {

      //localStorage.setItem('token', this.generateToken(Number));
      this.userId = Number;

      return Number;
  }));
  }

  generateToken(userId: Number): string {

    const payload = {
      userId: userId,
      // Ajoutez d'autres informations au payload si nécessaire
    };

    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));

    const signature = this.generateSignature(encodedHeader, encodedPayload);

    const token = `${encodedHeader}.${encodedPayload}.${signature}`;
    return token;
  }

  private generateSignature(header: string, payload: string): string {
    const secretKey = this.generateSecretKey();
    const data = `${header}.${payload}`;

    const signature = btoa(data + secretKey); // Utilisez une méthode appropriée pour signer les données avec votre clé secrète

    return signature;
  }

  generateSecretKey = () => {
    //return crypto.randomBytes(32).toString('hex');
  };


  // Fonction appelé à l'inscription
  public register(nom: string, prenom: string, pseudo: string, email: string, password: string) {
    return this.httpClient.get<Boolean>(this.baseUrl + '/register.php?nom=' + nom + '&prenom=' + prenom + '&pseudo=' + pseudo + '&email=' + email + '&password=' + password).pipe(map(Boolean => {
      return Boolean;
  }));
  }

  public getConnectedUserId() {return this.userId;}

  

}
