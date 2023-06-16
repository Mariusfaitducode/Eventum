import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit{
  
    constructor(private router: Router) {
    }
  
    ngOnInit(): void {
      if(localStorage.getItem('token') == null){ // L'utilisateur n'est pas connecté
        // redirection vers la page hub
        this.router.navigateByUrl('hub');
      }
    }

}
