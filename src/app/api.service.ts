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
    baseUrl: string = "http://localhost/eventum/Eventum_Angular/php";

    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

    constructor(private httpClient: HttpClient) { }

}