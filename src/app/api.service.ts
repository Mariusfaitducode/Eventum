import { Injectable, Output, EventEmitter } from '@angular/core'
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { User } from './model/classes/user/user';


@Injectable({
    providedIn: 'root'
})

export class ApiService {
    redirectUrl!: string;
    baseUrl: string = "https://mariusdiguat.fr/Eventum/backend/php";

    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

    constructor(private httpClient: HttpClient) { }

    public getUsers() {
        return this.httpClient.get<User[]>(this.baseUrl + '/utilisateur.php').pipe(map(Users => {
            return Users;
        }));;
    }

    public getUserById(id: number) {
        return this.httpClient.get<User>(this.baseUrl + '/utilisateur.php?id=' + id).pipe(map(User => {
            return User;
        }));
    }

}