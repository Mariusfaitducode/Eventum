import { Component } from '@angular/core';
import { RightPaneComponent } from '../../right-pane/right-pane.component';
import { LeftPaneComponent } from '../../left-pane/left-pane.component';
import { User } from '../../../model/classes/user/user';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';


import { OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],

})
export class ProfilComponent {
  user!: User; // Assurez-vous d'importer le modèle User depuis votre API ou de le définir correctement

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];

      this.apiService.getUserById(id).subscribe((user) => {
        console.log(user); // Check if the user object is retrieved correctly
        this.user = user;
      });
    });
  }
}

  
