import { Component } from '@angular/core';
import { Categorie } from 'src/app/model/classes/categorie/categorie';
import { EventService } from 'src/app/model/services/event/event.service';
import { UserService } from 'src/app/model/services/user/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/model/classes/event/event';

@Component({
  selector: 'app-modifier-evenement',
  templateUrl: './modifier-evenement.component.html',
  styleUrls: ['./modifier-evenement.component.css']
})
export class ModifierEvenementComponent {
    //Récupération de l'evenement
    public event!: Event;

    // Récupération des données du formulaire
    public titre: string = ""
    public description: string = ""
    public date: Date = new Date()
    public heure: string=""
    public lieu: string=""
    public is_public: boolean = false
    public id_categorie: number = -1
    public id_user: number = 0

    // Verification des champs vides
    public empty_title: boolean = false;
    public empty_description: boolean = false;
    public empty_date: boolean = false;
    public empty_hour: boolean = false;
    public empty_location: boolean = false;
    public empty_categorie: boolean = false;

    // Messages de succès/erreur
    public success: boolean = false;
    public error: boolean = false;
    // Message d'erreur
    public error_message: string = "";

    // Récupération des catégories
    public list_categorie!: Categorie[]
  

    //constructor
    constructor(private service: EventService, private userService: UserService, private router: Router, private route: ActivatedRoute) {
      // Récupération de l'evenement
      this.route.params.subscribe((params) => {
        var id = +params['id'];
        console.log('id' + id);
        this.service.getEventById(id).subscribe((data: Event) => {
          this.event = data;
          this.titre = data.titre;
          this.description = this.event.description;
          this.date = this.event.date;
          this.heure = this.event.heure;
          this.lieu = this.event.lieu;
          this.is_public = this.event.is_public;
          this.id_categorie = this.event.id_categorie;
        });
      });


      this.service.getCategories().subscribe((data: Categorie[]) => {
        console.log(data);
        this.list_categorie = data;
      });
      this.userService.getUserByToken().subscribe((data: any) => {
        console.log(data);
        this.id_user = data.id_utilisateur;
      });
    }

    OnConfirm(): void {
    }

}
