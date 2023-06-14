import { Component, Input } from '@angular/core';
import { User } from '../../../../model/classes/user/user';
import { Relation } from 'src/app/model/classes/relation/relation';

@Component({
  selector: 'app-profil-section',
  templateUrl: './profil-section.component.html',
  styleUrls: ['./profil-section.component.css']
})
export class ProfilSectionComponent {
  @Input() user!: User; // Assurez-vous d'importer le modèle User depuis votre API ou de le définir correctement
  @Input() connectedUser!: User;
  @Input() relation!: [Relation, Relation];
  @Input() personnal_page!: boolean;

  constructor() {
  }

  ngOnInit() {

  }
}
