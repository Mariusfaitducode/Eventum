import { Injectable } from '@angular/core';
import { User } from '../../classes/user/user';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user!: User ;
  constructor(private http: HttpClient) {
    
  }

  
  getData() : Observable<User[]>{
    return this.http.get<User[]>('http://localhost:8080/api/user');
  }
}
