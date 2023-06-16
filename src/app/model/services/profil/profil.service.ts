import { Injectable, Output, EventEmitter } from '@angular/core'
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

/* Sert à transmettre l'information de succès ou d'échec d'une opération asynchrone comme les appels HTTP. */

@Injectable({
  providedIn: 'root'
})

export class ProfilService {

  success: boolean = false;

  constructor(private httpClient: HttpClient) { }

  public setSuccess(){
    this.success = true;

    setTimeout(() => {
      this.success = false;
  }, 5000);

  }

  public getSuccess(){
    return this.success;
  }

}


