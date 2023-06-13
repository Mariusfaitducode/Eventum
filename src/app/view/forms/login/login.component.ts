import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { AuthentificationService } from 'src/app/model/services/authentification/authentification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: string = ""
  public password: string = ""


  constructor(private router: Router, private service: AuthentificationService) {
  }

  onConnect(): void {
    // verifier la connection grâce au service d'authentification
    console.log(this.login);
    console.log(this.password);

    this.service.login(this.login, this.password).subscribe((data: Boolean) => {
      console.log(data);
      if(data){ // Si la connection est réussi
        this.router.navigate(['/home']);
      }else{ // Sinon redirection à login avec message d'erreur
        this.router.navigate(['/hub'])
      }
    });
  
  }

  onSubmit(): void {
    
  }

  ngOnInit(): void {
  }

}
