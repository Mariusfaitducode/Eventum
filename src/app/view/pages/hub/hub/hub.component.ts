import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css']
})
export class HubComponent implements OnInit {
  constructor(private router: Router) {
  }
  ngOnInit(): void {
  }

  /**
   * Méthode qui affiche le formulaire d'inscription lors du clic du bouton inscription du hub
   */
  onRegister(): void {
    this.router.navigateByUrl('hub/register');
  }

  /**
   * Méthode qui affiche le formulaire de connexion lors du clic du bouton connexion du hub
   */
  onLogin(): void {
    this.router.navigateByUrl('hub/login');
  }


}
