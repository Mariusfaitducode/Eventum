import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/model/services/event/event.service';
import { UserService } from 'src/app/model/services/user/user.service';
import { ShareDataService } from 'src/app/model/services/share/share-data.service';
import { Event } from 'src/app/model/classes/event/event';
import { User } from 'src/app/model/classes/user/user';

@Component({
  selector: 'app-confirmer',
  templateUrl: './confirmer.component.html',
  styleUrls: ['./confirmer.component.css']
})
export class ConfirmerComponent implements OnInit {
  public id: number = 0;
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

  public Cancel(){
    this.router.navigate(['/event/' + this.id ]);
  }

  public Delete(){
    this.service.deleteEvent(this.id).subscribe((data) => {
      if(data){
        this.router.navigate(['/home']);
      }
    });
  }
}