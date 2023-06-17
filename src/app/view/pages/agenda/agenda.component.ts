import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/model/services/share/share-data.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit{
  
    constructor(private router: Router, public shareService: ShareDataService) {
    }
  
    ngOnInit(): void {
      if(localStorage.getItem('token') == null){ // L'utilisateur n'est pas connecté
        // redirection vers la page hub
        this.router.navigateByUrl('hub');
      }
    }

}
