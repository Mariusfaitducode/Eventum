import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/classes/user/user';
import { UserService } from 'src/app/model/services/user/user.service';
import { ProfilService } from 'src/app/model/services/profil/profil.service';

@Component({
  selector: 'app-modifier-profil',
  templateUrl: './modifier-profil.component.html',
  styleUrls: ['./modifier-profil.component.css']
})
export class ModifierProfilComponent {
  public nom : string = "";
  public prenom : string = "";
  public email : string = "";
  public pseudo : string = "";
  public password : string = "";

  public user!: User;

  public error : boolean = false;
  public error_message : string = "";
  
    constructor(private router: Router, private service : UserService, public successService: ProfilService) {
      this.service.getUserByToken().subscribe((data: User) => {
        this.user = data;
        this.nom = data.nom;
        this.prenom = data.prenom;
        this.email = data.email;
        this.pseudo = data.pseudo;
      });

    }
  
    ngOnInit(): void {

    }

    OnConfirm(){
      this.service.modifyUser( this.nom, this.prenom, this.email, this.pseudo, this.password).subscribe((data: any) => {
        if (data.success) {
          this.successService.setSuccess();
          this.router.navigateByUrl('profil');
        } else {
          this.error = true;
          this.error_message = data.message;
          setTimeout(() => {
            this.error = false;
            this.error_message = " ";
        }, 3000);
        }
      });
  }


}
