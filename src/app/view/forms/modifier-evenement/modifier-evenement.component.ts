import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/model/classes/categorie/categorie';
import { EventService } from 'src/app/model/services/event/event.service';
import { UserService } from 'src/app/model/services/user/user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/model/classes/event/event';
import { User } from 'src/app/model/classes/user/user';
import { ShareDataService } from 'src/app/model/services/share/share-data.service';
import { NavigationExtras } from '@angular/router';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-modifier-evenement',
  templateUrl: './modifier-evenement.component.html',
  styleUrls: ['./modifier-evenement.component.css']
})
export class ModifierEvenementComponent implements OnInit{
    //Récupération de l'evenement
    public event!: Event;

    // Récupération des données du formulaire
    public titre: string = ""
    public description: string = ""
    public date: Date = new Date()
    public heure: string=""
    public lieu: string=""
    //public is_public: boolean = false
    public id_categorie: number = -1
    public id_user: number = 0
    public max_participants!: number

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
    constructor(private service: EventService, private zone: NgZone, private userService: UserService, private router: Router, private route: ActivatedRoute, private shareService: ShareDataService) {
      if(localStorage.getItem('token') == null){ // L'utilisateur n'est pas connecté
        // redirection vers la page hub
        this.router.navigateByUrl('hub');
      }
  
    }

    ngOnInit(): void {

       this.route.queryParams.subscribe((params) => {
         var id = +params['id'];
         console.log(id);
        
         try{
          this.service.getEventById(id).subscribe((data: Event) => {

            // Vérification que l'utilisateur est bien l'auteur de l'evenement
            this.userService.getUserByToken().subscribe((user: User) => {
              if(user.id_utilisateur != data.id_createur){
                this.router.navigate(['/event/' + id ]);
              }
            });

            this.event = data;
            this.titre = data.titre;
            this.description = this.event.description;
            this.date = this.event.date;
            this.heure = this.event.heure;
            this.lieu = this.event.lieu;
            this.id_categorie = this.event.id_categorie;
            this.max_participants = this.event.max_participants;
          },
          (error) => {
            this.router.navigate(['/home']);
          });
         }catch(e){
          this.router.navigate(['/home']);
        }
        });

       this.service.getCategories().subscribe((data: Categorie[]) => {
        console.log(data);
        this.list_categorie = data;
      });
      
      this.userService.getUserByToken().subscribe((data: User) => {
        console.log(data);
        this.id_user = data.id_utilisateur;
      });
 

     }

    OnConfirm(): void {
      // Vérification des champs vides
      if(this.titre == ""){
        this.empty_title = true;
      }else{
        this.empty_title = false;
      }

      if(this.description == ""){
        this.empty_description = true;
      }else{
        this.empty_description = false;
      }

      if(this.date == null){
        this.empty_date = true;
      }else{
        this.empty_date = false;
      }

      if(this.heure == ""){
        this.empty_hour = true;
      }else{
        this.empty_hour = false;
      }

      if(this.lieu == ""){
        this.empty_location = true;
      }else{
        this.empty_location = false;
      }

      if(this.id_categorie == -1){
        this.empty_categorie = true;
      }else{
        this.empty_categorie = false;
      }

      // Si tous les champs sont remplis
      if(!this.empty_title && !this.empty_description && !this.empty_date && !this.empty_hour && !this.empty_location && !this.empty_categorie){
        this.service.modifyEvent(this.event.id_evenement, this.titre, this.description, this.date, this.heure, this.lieu, this.id_categorie, this.id_user, this.max_participants).subscribe((data: any) => {
          this.success= data.success;
          this.error_message = data.message;
          if(this.success){
            this.shareService.setSuccessModifyEvent();
              this.router.navigate(['/event/' + this.event.id_evenement ]);
          }
      }
      );
      }else{
        this.error = true;
        this.error_message = "Veuillez remplir tous les champs";
      }

       // Hide the success/error messages after 3 seconds
      setTimeout(() => {
        this.success = false;
        this.error = false;
      }, 3000);

    }

    delete(){
      const navigationExtras: NavigationExtras = {
        queryParams: { 'id': this.event.id_evenement }
      };
      this.router.navigate(['/event/'+ this.event.id_evenement + '/confirmer'], navigationExtras);
    }
}
