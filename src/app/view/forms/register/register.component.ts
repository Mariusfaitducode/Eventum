import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/model/services/authentification/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public name: string = ""
  public firstname: string = ""
  public username: string = ""
  public email: string = ""
  public password: string = ""
  public confirm_password: string = ""

  // verification des erreurs
  public error_message : string = "";
  public error : boolean = false;

  // vérification des champs vides
  public is_name_empty: boolean = false;
  public is_firstname_empty: boolean = false;
  public is_username_empty: boolean = false;
  public is_email_empty: boolean = false;
  public is_password_empty: boolean = false;
  public is_confirm_password_empty: boolean = false;



  constructor(private router: Router, private service: AuthentificationService) {
  }

  onConnect(): void {
    // vérification des champs vides
    if(this.name == ""){ // Si le nom est vide
      this.is_name_empty = true;
    }else{
      this.is_name_empty = false;
    }

    if(this.firstname == ""){ // Si le prénom est vide
      this.is_firstname_empty = true;
    }else{
      this.is_firstname_empty = false;
    }

    if(this.username == ""){ // Si le pseudo est vide
      this.is_username_empty = true;
    }else{
      this.is_username_empty = false;
    }

    if(this.email == ""){ // Si le mail est vide
      this.is_email_empty = true;
    }else{
      this.is_email_empty = false;
    }

    if(this.password == ""){ // Si le password est vide
      this.is_password_empty = true;
    }else{
      this.is_password_empty = false;
    }

    if(this.confirm_password == ""){ // Si le confirm_password est vide
      this.is_confirm_password_empty = true;
    }else{
      this.is_confirm_password_empty = false;
    }

    if(this.is_name_empty || this.is_firstname_empty || this.is_username_empty || this.is_email_empty || this.is_password_empty || this.is_confirm_password_empty){ // Si un des champs est vide
      this.error = true;
      this.error_message = "Veuillez remplir tous les champs";
    }else{ // Si les champs sont remplis

      // verifier la connection grâce au service d'authentification
      if(this.password != this.confirm_password){
        this.error = true;
        this.is_password_empty = true;
        this.is_confirm_password_empty = true;
        this.error_message = "Les mots de passe ne correspondent pas";
      }else{
        console.log(this.name, this.firstname, this.username, this.email, this.password);
        this.service.register(this.name, this.firstname, this.username, this.email, this.password).subscribe((data: any) => {
          console.log(data);
          if(data.success){ // Si la connection est réussi
          
            this.router.navigate(['hub/login'], { queryParams: { registered: 'true' }  });
          }else{ // Si la connection est refusé
            this.error = true;
            this.error_message = data.message;
          }
        },
        (error) => {
          this.error = true;
          this.error_message = "L'inscription a échoué";
        }
          );
      }
    }
    // timer pour enlever le message d'erreur
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }
  ngOnInit(): void {

  }
}
