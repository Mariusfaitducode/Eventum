import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/model/classes/categorie/categorie';
import { EventService } from 'src/app/model/services/event/event.service';
import { UserService } from 'src/app/model/services/user/user.service';
import { Observable } from 'rxjs';
import { FileService } from 'src/app/model/services/file/file.service';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';


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
  public is_public: boolean = false
  public id_categorie: number = -1
  public id_user: number = 0
  public selectedImage: File = new File([], "");
  
  // Récupération des catégories
  public list_categorie!: Categorie[]
  
  // Messages de succès/erreur
  public success: boolean = false;
  public error: boolean = false;
  // Message d'erreur
  error_message: string = "";

  // Verification des champs vides
  public empty_title: boolean = false;
  public empty_description: boolean = false;
  public empty_date: boolean = false;
  public empty_hour: boolean = false;
  public empty_location: boolean = false;
  public empty_categorie: boolean = false;


  constructor(private service: EventService, private userService: UserService, private router: Router, private http: HttpClient) {
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
    this.empty_title = true;
  } else {
    this.empty_title = false;
  }

  if (this.description == "") {
    this.empty_description = true;
  } else {
    this.empty_description = false;
  }

  if (this.date == null) {
    this.empty_date = true;
  }else{
    this.empty_date = false;
  }

  if (this.heure == "") {
    this.empty_hour = true;
  }else{
    this.empty_hour = false;
  }

  if (this.lieu == "") {
    this.empty_location = true;
  }else{
    this.empty_location = false;
  }

  if (this.id_categorie == -1) {
    this.empty_categorie = true;
  }else{
    this.empty_categorie = false;
  }

  // Vérifiez les autres champs requis de la même manière

  // Si un champ requis est vide, arrêtez ici et affichez le message d'erreur
  if (this.empty_title || this.empty_description || this.empty_date || this.empty_hour || this.empty_location || this.empty_categorie) {
    this.error = true;
    this.error_message = "Veuillez remplir tous les champs obligatoires";
  }else{

    this.heure = this.heure.padStart(5, '0') + ':00';

    this.service.addEvent(this.titre, this.description, this.date, this.heure, this.lieu, this.is_public, this.id_categorie, this.id_user, 'images/evenements/' + this.selectedImage.name).subscribe((data: boolean) => {
        this.success = data;
        this.error = !data;
        
        // Hide the success/error messages after 3 seconds
        setTimeout(() => {
          this.success = false;
          this.error = false;
        }, 3000);
      });
      (error: any) => {
        // Handle the error here
        console.error(error);
        this.success = false;
        this.error = true;
        
      }
    
  }
  // Hide the success/error messages after 3 seconds
  setTimeout(() => {
    this.success = false;
    this.error = false;
  }, 3000);
}

  ngOnInit(): void {
    if(localStorage.getItem('token') == null){ // L'utilisateur n'est pas connecté
      // redirection vers la page hub
      this.router.navigateByUrl('hub');
    }
  }

  onImageChange(event: any): void {
     this.http.post('http://localhost/', event.target.files[0])
     .subscribe(event => {
       console.log('done') // Base64 encoded image data
     })
  }

  upload(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post('http://localhost/eventum/Eventum_Angular', formData)
      .subscribe(event => {
        console.log('done')
      })
  }



}
