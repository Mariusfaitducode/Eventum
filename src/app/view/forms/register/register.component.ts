import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/model/services/authentification/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public nom: string = ""
  public prenom: string = ""
  public pseudo: string = ""
  public email: string = ""
  public password: string = ""
  public confirm_password: string = ""


  constructor(private router: Router, private service: AuthentificationService) {
  }

  onConnect(): void {
    // verifier la connection grâce au service d'authentification
    if(this.password != this.confirm_password){
      console.log("Les mots de passe ne correspondent pas");
    }else{
      this.service.register(this.nom, this.prenom, this.pseudo, this.email, this.password).subscribe((data: Boolean) => {
        console.log(data);
  
      });
    }
  }

  onSubmit(): void {

  }

  ngOnInit(): void {

  }
}
