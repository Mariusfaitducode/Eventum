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

import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],

})
export class ProfilComponent {
  connectedUser!: User;
  user!: User; // Assurez-vous d'importer le modèle User depuis votre API ou de le définir correctement
  //relation!: [Relation, Relation];

  following: boolean = false;
  followed: boolean = false;

  

  personnal_page: boolean = false;


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

          this.personnal_page = true;

          console.log("token profil");

          this.service.getUserByToken().subscribe((user) => {

            this.user = user;
          });
        }
        else{
          //Visite page profil

          this.service.getUserById(id).subscribe((user) => {

            console.log(user); // Check if the user object is retrieved correctly
            this.user = user;

            this.service.getUserByToken().subscribe(async (user) => {

              this.connectedUser = user;

              //const relation1 = await this.service.getRelation(id, this.connectedUser.id_utilisateur).toPromise();

              this.loadRelationData();
              
            });
          });
          console.log("folllowed ="+this.followed); // Check if the user object is retrieved correctly
          console.log("folllowing ="+this.following); // Check if the user object is retrieved correctly
        }

      });
    } 
  }

  async loadRelationData() {
    this.followed = false;
    this.following = false;
    
    const relation0 = await firstValueFrom(this.service.getRelation(this.user.id_utilisateur, this.connectedUser.id_utilisateur));
    console.log("relation 0 =", relation0);
    console.log("relation statut =", relation0.statut);
    
    if (relation0.statut == "accepte") {
      console.log("relation 0 accepte");
      this.followed = true;
    }
  
    const relation1 = await firstValueFrom(this.service.getRelation(this.connectedUser.id_utilisateur, this.user.id_utilisateur));
    console.log("relation 1 =", relation1);
    console.log("relation statut =", relation1.statut);
    
    if (relation1.statut == "accepte") {
      console.log("relation 1 accepte");
      this.following = true;
    }
  }
  

}




