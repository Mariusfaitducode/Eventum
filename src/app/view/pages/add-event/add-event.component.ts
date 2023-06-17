import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/classes/categorie/categorie';
import { EventService } from 'src/app/model/services/event/event.service';
import { UserService } from 'src/app/model/services/user/user.service';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/model/services/file/file.service';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';
import { ShareDataService } from 'src/app/model/services/share/share-data.service';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit{
  // Récupération des données du formulaire
  public titre: string = ""
  public description: string = ""
  public date: Date = new Date()
  public heure: string=""
  public lieu: string=""
  //public is_public: boolean = false
  public id_categorie: number = -1
  public id_user: number = 0
  public selectedImage: File = new File([], "");
  public max_participants: number = 0;
  
  // Récupération des catégories
  public list_categorie!: Categorie[]
  
  // Messages de succès/erreur
  public error: boolean = false;
  // Message d'erreur
  public error_message: string = "";

  // Verification des champs vides
  public empty_title: boolean = false;
  public empty_description: boolean = false;
  public empty_date: boolean = false;
  public empty_hour: boolean = false;
  public empty_location: boolean = false;
  public empty_categorie: boolean = false;
  public empty_max_participants: boolean = false;


  constructor(private service: EventService, private userService: UserService, private router: Router, private shareService : ShareDataService, private fileService: FileService){

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
    // Vérification des champs requis
  if (this.titre == "") {
    console.log("titre vide");
    this.empty_title = true;
  } else {
    this.empty_title = false;
  }

  if (this.description == "") {
    console.log("description vide");
    this.empty_description = true;
  } else {
    this.empty_description = false;
  }

  if (this.date == null) {
    this.empty_date = true;
  }else{
    console.log(this.date);
    this.empty_date = false;
  }

  if (this.heure == "") {
    console.log("heure vide");
    this.empty_hour = true;
  }else{
    this.empty_hour = false;
  }

  if (this.lieu == "") {
    console.log("lieu vide");
    this.empty_location = true;
  }else{
    this.empty_location = false;
  }

  if (this.id_categorie == -1) {
    console.log("categorie vide");
    this.empty_categorie = true;
  }else{
    this.empty_categorie = false;
  }

  if (this.max_participants == 0) {
    console.log("max_participants vide");
    this.empty_max_participants = true;
  }else{
    this.empty_max_participants = false;
  }

  // Vérifiez les autres champs requis de la même manière

  // Si un champ requis est vide, arrêtez ici et affichez le message d'erreur
  if (this.empty_title || this.empty_description || this.empty_date || this.empty_hour || this.empty_location || this.empty_categorie || this.empty_max_participants) {
    this.error = true;
    this.error_message = "Veuillez remplir tous les champs obligatoires";
  }else{
    this.service.addEvent(this.titre, this.description, this.date, this.heure, this.lieu, this.id_categorie, this.id_user, this.max_participants).subscribe((data: any) => {
        
        if(data != null){
          // redirection vers l'agenda
          this.shareService.setSuccessAddEvent();
          this.router.navigateByUrl('event/'+ data);
        }else{
          this.error = true;
          this.error_message = "Une erreur est survenue lors de l'ajout de l'évènement";
        }

        // Hide the success/error messages after 3 seconds
        setTimeout(() => {
          this.error = false;
        }, 3000);
      });
      (error: any) => {
        // Handle the error here

        this.error = true;
        
      }
    
  }
  // Hide the success/error messages after 3 seconds
  setTimeout(() => {
    this.error = false;
  }, 3000);
}

  ngOnInit(): void {
    if(localStorage.getItem('token') == null){ // L'utilisateur n'est pas connecté
      // redirection vers la page hub
      this.router.navigateByUrl('hub');
    }
  }

}
