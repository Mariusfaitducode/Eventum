import { Component, Input } from '@angular/core';
import { User } from '../../../../model/classes/user/user';
import { Relation } from 'src/app/model/classes/relation/relation';

import { UserService } from 'src/app/model/services/user/user.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-profil-section',
  templateUrl: './profil-section.component.html',
  styleUrls: ['./profil-section.component.css']
})
export class ProfilSectionComponent {
  @Input() user!: User; // Assurez-vous d'importer le modèle User depuis votre API ou de le définir correctement
  @Input() connectedUser!: User;
  @Input() followed!: boolean;
  @Input() following!: boolean;
  @Input() personnal_page!: boolean;
  @Input() number_events!: [number, number];
  public modifier_profil: boolean = false;


  constructor(private userService: UserService, public router: Router) {
  }

  follow() {
    
    this.userService.follow(this.connectedUser.id_utilisateur, this.user.id_utilisateur).subscribe();
  }

  unfollow() {

    this.userService.unfollow(this.connectedUser.id_utilisateur, this.user.id_utilisateur).subscribe();
  }


  ngOnInit() {

  }

  modifier(){
    this.router.navigateByUrl('profil/modifier');
  }

  deconnexion(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('hub');
  }
}
