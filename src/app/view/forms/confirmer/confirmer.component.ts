import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/model/services/event/event.service';
import { UserService } from 'src/app/model/services/user/user.service';
import { ShareDataService } from 'src/app/model/services/share/share-data.service';
import { Event } from 'src/app/model/classes/event/event';
import { User } from 'src/app/model/classes/user/user';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-confirmer',
  templateUrl: './confirmer.component.html',
  styleUrls: ['./confirmer.component.css']
})
export class ConfirmerComponent implements OnInit {
  public id: number = 0;
  public password : string = "";
  public error : boolean = false;
  public empty_password : boolean = false;

   //constructor
   constructor(private service: EventService, private userService: UserService, private router: Router, private route: ActivatedRoute, private shareService: ShareDataService) {
    if(localStorage.getItem('token') == null){ // L'utilisateur n'est pas connecté
      // redirection vers la page hub
      this.router.navigateByUrl('hub');
    }

  }

  ngOnInit(): void {

     this.route.queryParams.subscribe((params) => {
       this.id = +params['id'];
       try{
        this.service.getEventById(this.id).subscribe((data: Event) => {

          // Vérification que l'utilisateur est bien l'auteur de l'evenement
          this.userService.getUserByToken().subscribe((user: User) => {
            if(user.id_utilisateur != data.id_createur){
              this.router.navigate(['/event/' + this.id ]);
            }
          });

          },
          (error) => {
            this.router.navigate(['/home']);
          });
      }catch(e){
        this.router.navigate(['/home']);
      }
    });

  }

  public Retour(){
    const navigationExtras: NavigationExtras = {
      queryParams: { 'id': this.id }
    };
    this.router.navigate(['/event/' + this.id + '/modifier'], navigationExtras);
  }

  public Delete(){
    // verification des champs vides
    if(this.password == ""){
      this.empty_password = true;
    }else{
      // vérification du mot de passe
      this.userService.getUserByToken().subscribe((user: User) => {
        this.userService.isPasswordCorrect(user.id_utilisateur, this.password).subscribe((password: Boolean) => {
          if(password){
            this.service.deleteEvent(this.id).subscribe((data) => {
              if(data){
                this.router.navigate(['/home']);
                }
              });
            }else{
              this.error = true;
              setTimeout(() => {
                this.error = false;
            }, 3000);
            }
          },
          (error) => {
            this.error = true;
            setTimeout(() => {
              this.error = false;
          }, 3000);
          }
        );
      });
    }
  }
}