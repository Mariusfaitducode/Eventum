import { Component } from '@angular/core';
import { RightPaneComponent } from '../../right-pane/right-pane.component';
import { LeftPaneComponent } from '../../left-pane/left-pane.component';
import { User } from '../../../model/classes/user/user';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';


import { OnInit } from '@angular/core';
import { UserService } from 'src/app/model/services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],

})
export class ProfilComponent {
  user!: User; // Assurez-vous d'importer le modèle User depuis votre API ou de le définir correctement

  constructor(
    private route: ActivatedRoute,
    private service: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      console.log(id); // Check if the id is correct

      this.service.getUserById(id).subscribe((user) => {

        console.log("user ="+user); // Check if the user object is retrieved correctly
        this.user = user;
      });
    });
  }
}

  
