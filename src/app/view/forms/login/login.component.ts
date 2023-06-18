import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { AuthentificationService } from 'src/app/model/services/authentification/authentification.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: string = ""
  public password: string = ""

  public is_login_empty: boolean = false;
  public is_password_empty: boolean = false;

  // verification des erreurs
  public error_message : string = "";
  public error : boolean = false;
  public success : boolean = false;
  


  constructor(private router: Router, private service: AuthentificationService, private activateRoute: ActivatedRoute) {
  }

  onConnect(): void {
    // verifier la connection grâce au service d'authentification
    if(this.login == ""){ // Si le login est vide
      this.is_login_empty = true;
    }else{
      this.is_login_empty = false;
    }

    if(this.password == ""){ // Si le password est vide
      this.is_password_empty = true;
    }else{
      this.is_password_empty = false;
    }

    if(this.is_login_empty || this.is_password_empty){ // Si un des champs est vide
      this.error = true;
      this.error_message = "Veuillez remplir tous les champs";
    }else{ // Si les champs sont remplis


      this.service.login(this.login, this.password).subscribe((data: boolean) => {
        console.log(data);
        if(data){ // Si la connection est réussi
          this.router.navigate(['/home']);
        }else{ // Sinon redirection à login avec message d'erreur
          this.error = true;
          this.error_message = "mail ou mot de passe incorrect";
        }
      },
      (error) => {
        this.error = true;
        this.error_message = "erreur de connexion";
    });
  }
  setTimeout(() => {
    this.error = false;
    this.error_message = "";
  }
  , 3000);
}

  ngOnInit(): void {
    // verification des parametres de l'url
    this.activateRoute.queryParams.subscribe(params => {
      const registered = params['registered'];
      if (registered === 'true') {
        this.success = true;
        this.error = false;
       
        setTimeout(() => {
          this.success = false;
        }
        , 3000);
      }
    });
  }

}
