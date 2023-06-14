import { Component } from '@angular/core';
import { RightPaneComponent } from '../../right-pane/right-pane.component';
import { LeftPaneComponent } from '../../left-pane/left-pane.component';
import { User } from '../../../model/classes/user/user';
import { Relation } from '../../../model/classes/relation/relation';

import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/model/services/authentification/authentification.service';


import { OnInit } from '@angular/core';
import { UserService } from 'src/app/model/services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],

})
export class ProfilComponent {
  user!: User; // Assurez-vous d'importer le modèle User depuis votre API ou de le définir correctement
  relation!: Relation;


  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private authService : AuthentificationService,
  ) {}

  ngOnInit() {


    const loggedIn: boolean = this.authService.isLoggedIn();

    //if (loggedIn)
    if (loggedIn) {

      this.route.params.subscribe((params) => {
        var id = +params['id'];
        // Check if the id is correct
        console.log("id ="+id);

        if (Number.isNaN(id)){

          //Page profil utilisateur connecté

          console.log("token profil");

          this.service.getUserByToken().subscribe((user) => {

            console.log(user); // Check if the user object is retrieved correctly
            console.log("user"); // Check if the user object is retrieved correctly
            this.user = user;
          });
        }
        else{
          //Visite page profil

          this.service.getUserById(id).subscribe((user) => {

            console.log("user ="+user); // Check if the user object is retrieved correctly
            this.user = user;
          });
        }



        // this.service.getRelation(id, 1).subscribe((relation) => {
        //
        //     console.log("relation ="+relation); // Check if the user object is retrieved correctly
        //     console.log("relation statut ="+relation.statut); // Check if the user object is retrieved correctly
        //     this.relation = relation;
        //   });
      });



      // L'utilisateur est connecté, vous pouvez charger les données du profil
      // Si c'est le profil de l'utilisateur actuel, vous pouvez le traiter différemment

      //const currentUserId = getUserIdFromToken(); // Obtenez l'ID de l'utilisateur à partir du token
      //if currentUserId === this.user.Id_utilisateur -> C'est le profil de l'utilisateur actuel

      if (false) {
        // C'est le profil de l'utilisateur actuel
      } else {
        // C'est le profil d'un autre utilisateur
      }
    } else {
      // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    }
  }
}


